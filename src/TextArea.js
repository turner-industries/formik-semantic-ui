import React, {Component, Fragment} from 'react';
import {Form, Ref, TextArea} from 'semantic-ui-react';
import {FastField, Field, getIn} from 'formik';
import ErrorMessage from './ErrorMessage';
import {NullRef} from './InputRef';
import {getFieldError, setFieldValue} from './helpers';

class FormikTextArea extends Component {
  constructor(props) {
    super(props);
    const {id, name} = props;
    this.id = id || `field_textarea_${name}`;
  }

  render() {
    const {
      name,
      label,
      validate,
      inputProps = {},
      fieldProps = {},
      validateOnChange,
      errorComponent = ErrorMessage,
      inputRef,
      fast
    } = this.props;
    const {onChange, ...safeInputProps} = inputProps;
    const RefWrapper = inputRef ? Ref : NullRef;
    const DesiredField = fast === true ? FastField : Field;
    return (
      <DesiredField
        name={name}
        validate={validate}
        render={({field, form}) => {
          const error = getFieldError(field, form);
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <RefWrapper innerRef={inputRef}>
                <TextArea
                  id={this.id}
                  name={name}
                  rows={4}
                  {...safeInputProps}
                  value={field.value}
                  onChange={(e, {name, value}) => {
                    setFieldValue(form, name, value, validateOnChange);
                    Promise.resolve().then(() => {
                      onChange && onChange(e, {name, value});
                    });
                  }}
                  onBlur={form.handleBlur}
                />
              </RefWrapper>
              {error && (
                React.createElement(errorComponent, { message: getIn(form.errors, name) })
              )}
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FormikTextArea;
