import React, {Component} from 'react';
import {Form, Input} from 'semantic-ui-react';
import {Field} from 'formik';

class FormikInput extends Component {
  constructor(props) {
    super(props);
    const {id, name} = props;
    this.id = id || `field_input_${name}`;
  }

  render() {
    const {name, label, inputProps = {}, fieldProps = {}} = this.props;
    const {onChange, ...safeInputProps} = inputProps;
    return (
      <Field
        name={name}
        render={({field, form}) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <Input
                id={this.id}
                name={name}
                {...safeInputProps}
                value={field.value}
                onChange={(e, {name, value}) => {
                  form.setFieldValue(name, value, true);
                  onChange && onChange(e, {name, value});
                }}
              />
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
