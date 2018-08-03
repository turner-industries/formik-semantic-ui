import React, { Component } from "react";

import { Button, Form, Input } from "../lib/index";

class SimpleForm extends Component {
  _handleSubmit = (values, formikApi) => {
    console.log(values);
    setTimeout(() => {
      Object.keys(values).forEach(key => {
        formikApi.setFieldError(key, "Some Error");
      });
      formikApi.setSubmitting(false);
    }, 1000);
  };

  render() {
    return (
      <Form
        initialValues={{
          emailAddress: "",
          firstName: "",
          lastName: ""
        }}
        onSubmit={this._handleSubmit}
      >
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
