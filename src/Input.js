import React, {Component} from 'react';
import {Form, Input} from 'semantic-ui-react';
import {Field} from 'formik';
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
    } = this.props;
    const {onChange, ...safeInputProps} = inputProps;

    return (
      <Field
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
                <span className="sui-error-message">{form.errors[name]}</span>
              )}
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FormikInput;
