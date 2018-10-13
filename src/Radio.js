import React, {Component} from 'react';
import {Form, Radio} from 'semantic-ui-react';
import {Field} from 'formik';
import {InputRef} from './InputRef';

class FormikCheckbox extends Component {
  constructor(props) {
    super(props);
    const {id, name, value} = props;
    this.id = id ? `${id}_${value}` : `field_radio_${name}_${value}`;
  }

  render() {
    const {
      name,
      label,
      value,
      inputProps = {},
      fieldProps = {},
      inputRef,
    } = this.props;
    const {onChange, ...safeInputProps} = inputProps;
    return (
      <Field
        name={name}
        render={({field, form}) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              <InputRef inputRef={inputRef}>
                <Radio
                  {...safeInputProps}
                  id={this.id}
                  label={label}
                  name={name}
                  value={value}
                  checked={field.value === value}
                  onChange={(e, {name, value}) => {
                    form.setFieldValue(name, value, true);
                    onChange && onChange(e, {name, value});
                  }}
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

export default FormikCheckbox;
