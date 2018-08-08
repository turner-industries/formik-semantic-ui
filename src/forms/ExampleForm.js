import React, {Component} from 'react';
import moment from 'moment';

import {Button, Checkbox, Form, Input, Dropdown, TextArea} from '../lib/index';
import {DatePicker, FileUpload} from '../custom/index';

class ExampleForm extends Component {
  _handleSubmit = (values, formikApi) => {
    console.log(values);
    setTimeout(() => {
      Object.keys(values).forEach(key => {
        formikApi.setFieldError(key, 'Some Error');
      });
      formikApi.setSubmitting(false);
    }, 1000);
  };

  render() {
    return (
      <Form
        initialValues={{
          emailAddress: '',
          firstName: '',
          lastName: '',
          gender: '',
          ssn: '',
          notes: '',
          dob: '',
          fileUrl: '',
          likesCake: false,
        }}
        onSubmit={this._handleSubmit}
        render={({handleReset}) => (
          <Form.Children>
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
                  ),
                }}
              />
            </Form.Group>

            <Form.Group widths="2">
              <Input
                label="SSN"
                name="ssn"
                inputProps={{
                  type: 'password',
                }}
              />
              <Dropdown
                label="Gender"
                name="gender"
                options={[
                  {text: 'Female', value: 'F'},
                  {text: 'Male', value: 'M'},
                ]}
              />
            </Form.Group>

            <TextArea label="Notes" name="notes" />
            <Checkbox label="I like cake" name="likesCake" />

            <FileUpload label="Profile Picture Upload" name="fileUrl" />

            <Button.Submit primary>Submit</Button.Submit>
            <Button basic onClick={handleReset}>
              Cancel
            </Button>
          </Form.Children>
        )}
      />
    );
  }
}

export default ExampleForm;
