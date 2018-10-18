import React, {Component} from 'react';
import {
  Button,
  Dropdown,
  Form,
  Input,
  Checkbox,
  Radio,
} from 'formik-semantic-ui';

class SimpleForm extends Component {
  static defaultProps = {
    person: {
      emailAddress: '',
      firstName: '',
      lastName: '',
      checkbox: true,
      radio: undefined,
      dropdown: undefined,
    },
  };
  _handleSubmit = (values, formikApi) => {
    // Make API Call
    console.log(values, formikApi);
    // Handle response / Errors
    formikApi.setFieldError('emailAddress', 'Invalid Email');
    formikApi.setFieldError('firstName', 'Invalid Name');
    formikApi.setFieldError('checkbox', 'Invalid Check Box');
    formikApi.setFieldError('radio', 'Invalid Radio');
    formikApi.setFieldError('dropdown', 'Invalid Dropdown');
    formikApi.setSubmitting(false);
    this._email.focus();
  };

  render() {
    return (
      <Form
        initialValues={this.props.person}
        onSubmit={this._handleSubmit}
        serverValidation
      >
        <Input
          label="Email"
          name="emailAddress"
          inputRef={el => (this._email = el)}
        />

        <Form.Group widths="2">
          <Input label="First Name" name="firstName" />
          <Input label="Last Name" name="lastName" />
        </Form.Group>

        <Checkbox name="checkbox" label="Check Box" />

        <Radio name="radio" label="Option 1" value={1} />
        <Radio name="radio" label="Option 2" value={2} />
        <Dropdown
          name="dropdown"
          label="Dropdown"
          options={[{text: 'Option 1', value: 1}, {text: 'Option 2', value: 2}]}
        />

        <Button.Submit>Submit</Button.Submit>
        <Button.Reset>Cancel</Button.Reset>
      </Form>
    );
  }
}

export default SimpleForm;
