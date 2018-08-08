import React, {Component} from 'react';

import {Button, Form, Input} from '../lib/index';

class SimpleForm extends Component {
  static defaultProps = {
    person: {
      emailAddress: '',
      firstName: '',
      lastName: '',
    },
  };
  _handleSubmit = (values, formikApi) => {
    // Make API Call
    console.log(values, formikApi);
    // Handle response / Errors
    formikApi.setFieldError('emailAddress', 'Invalid Email');
    formikApi.setSubmitting(false);
  };

  render() {
    return (
      <Form initialValues={this.props.person} onSubmit={this._handleSubmit}>
        <Input label="Email" name="emailAddress" />

        <Form.Group widths="2">
          <Input label="First Name" name="firstName" />
          <Input label="Last Name" name="lastName" />
        </Form.Group>

        <Button.Submit>Submit</Button.Submit>
        <Button.Reset>Cancel</Button.Reset>
      </Form>
    );
  }
}

export default SimpleForm;
