import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import moment from "moment";

import { Checkbox, Input, Dropdown, TextArea } from "../lib/index";
import { DatePicker, FileUpload } from "../custom/index";

class ExampleForm extends Component {
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
      <Formik
        initialValues={{
          emailAddress: "",
          firstName: "",
          lastName: "",
          gender: "",
          ssn: "",
          notes: "",
          dob: "",
          fileUrl: "",
          likesCake: false
        }}
        onSubmit={this._handleSubmit}
        render={this._renderForm}
      />
    );
  }

  _renderForm = ({ handleSubmit, handleReset, isSubmitting }) => (
    <Form onSubmit={handleSubmit}>
      <Input label="Email" name="emailAddress" />

      <Form.Group widths="2">
        <Input label="First Name" name="firstName" />
        <Input label="Last Name" name="lastName" />
      </Form.Group>

      <Form.Group widths="2">
        <DatePicker
          label="D.O.B."
          name="dob"
          inputProps={{
            isOutsideRange: day => !moment(day).isSameOrBefore(moment()),
            renderMonthElement: props => (
              <DatePicker.YearMonthSelector {...props} />
            )
          }}
        />
      </Form.Group>

      <Form.Group widths="2">
        <Input
          label="SSN"
          name="ssn"
          inputProps={{
            type: "password"
          }}
        />
        <Dropdown
          label="Gender"
          name="gender"
          options={[
            { text: "Female", value: "F" },
            { text: "Male", value: "M" }
          ]}
        />
      </Form.Group>

      <TextArea label="Notes" name="notes" />
      <Checkbox label="I like cake" name="likesCake" />

      <FileUpload label="Profile Picture Upload" name="fileUrl" />

      <Button type="submit" loading={isSubmitting} primary>
        Submit
      </Button>
      <Button type="button" basic onClick={handleReset}>
        Cancel
      </Button>
    </Form>
  );
}

export default ExampleForm;
