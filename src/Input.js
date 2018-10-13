import React, {Component, Fragment} from 'react';
import {Form, Input, Ref} from 'semantic-ui-react';
import {Field} from 'formik';

const findInput = (cb, el) => el && cb(el.querySelector('input'));

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
      inputProps = {},
      fieldProps = {},
      inputRef,
    } = this.props;
    const {onChange, ...safeInputProps} = inputProps;
    const RefWrapper = inputRef ? Ref : Fragment;
    return (
      <Field
        name={name}
        render={({field, form}) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <RefWrapper innerRef={el => findInput(inputRef, el)}>
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
              </RefWrapper>
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
