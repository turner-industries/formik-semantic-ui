import React, {Component} from 'react';
import {Form, Dropdown} from 'semantic-ui-react';
import {FastField, Field, getIn} from 'formik';
import ErrorMessage from './ErrorMessage';
import {getFieldError, setFieldValue} from './helpers';

class FormikDropdown extends Component {
  constructor(props) {
    super(props);
    const {id, name} = props;
    this.id = id || `field_dropdown_${name}`;
  }

  render() {
    const {
      name,
      label,
      options,
      validate,
      inputProps = {},
      fieldProps = {},
      errorComponent = ErrorMessage,
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
              {!!label && (
                <label htmlFor={this.id} onClick={() => this._dropdown.open()}>
                  {label}
                </label>
              )}
              <Dropdown
                ref={el => (this._dropdown = el)}
                id={this.id}
                name={name}
                options={options}
                selectOnBlur={false}
                selectOnNavigation={false}
                selection
                {...safeInputProps}
                value={field.value}
                onChange={(e, {name, value}) => {
                  setFieldValue(form, name, value, true);
                  Promise.resolve().then(() => {
                    onChange && onChange(e, {name, value});
                  });
                }}
              />
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

export default FormikDropdown;
