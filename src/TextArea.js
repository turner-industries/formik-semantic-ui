import React, {Component, Fragment} from 'react';
import {Form, Ref, TextArea} from 'semantic-ui-react';
import {Field} from 'formik';

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
              <RefWrapper innerRef={inputRef}>
                <TextArea
                  id={this.id}
                  name={name}
                  rows={4}
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

export default FormikTextArea;
