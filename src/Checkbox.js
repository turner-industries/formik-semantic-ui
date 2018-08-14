import React, {Component} from 'react';
import {Form, Checkbox} from 'semantic-ui-react';
import {Field} from 'formik';

let fieldCounter = 0;
class FormikCheckbox extends Component {
  constructor(props) {
    super(props);
    this.id = props.id || `field_checkbox_${fieldCounter++}`;
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
              <Checkbox
                id={this.id}
                name={name}
                label={label}
                {...safeInputProps}
                checked={field.value}
                onChange={(e, {name, checked}) => {
                  form.setFieldValue(name, checked, true);
                  onChange && onChange(e, {name, value: checked});
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

export default FormikCheckbox;
