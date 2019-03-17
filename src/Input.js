import React, {Component} from 'react';
import {Form, Input} from 'semantic-ui-react';
import {FastField, Field, getIn} from 'formik';
import {InputRef} from './InputRef';
import {getFieldError, setFieldValue} from './helpers';

class FormikInput extends Component {
  constructor(props) {
    super(props);
    const {id, name} = props;
    this.id = id || `field_input_${name}`;
  }

  render() {
    const {
      name,
      label,
      validate,
      inputProps = {},
      fieldProps = {},
      inputRef,
      fast
    } = this.props;
    const {onChange, ...safeInputProps} = inputProps;
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

              <InputRef inputRef={inputRef}>
                <Input
                  id={this.id}
                  name={name}
                  {...safeInputProps}
                  value={field.value}
                  onChange={(e, {name, value}) => {
                    setFieldValue(form, name, value, false);
                    Promise.resolve().then(() => {
                      onChange && onChange(e, {name, value});
                    });
                  }}
                  onBlur={form.handleBlur}
                />
              </InputRef>

              {error && (
                <span className="sui-error-message">{getIn(form.errors, name)}</span>
              )}
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FormikInput;
