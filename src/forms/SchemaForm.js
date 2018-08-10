import React, {Component} from 'react';

import {Button, Form} from '../lib/index';

class SchemaForm extends Component {
  _handleSubmit = (values, formikApi) => {
    // Make API Call
    console.log(values, formikApi);
    // Handle response / Errors
    formikApi.setFieldError('emailAddress', 'Invalid Email');
    formikApi.setSubmitting(false);
  };

  render() {
    return (
      <Form
        onSubmit={this._handleSubmit}
        schema={{
          emailAddress: {
            label: 'Email Address',
            type: 'text',
            value: 'justinobney@gmail.com',
          },
          ssn: {
            label: 'SSN',
            type: 'password',
            fieldProps: {
              width: 8,
            },
          },
          notes: {
            label: 'Notes',
            type: 'textarea',
            inputProps: {
              rows: '6',
            },
          },
          likes: {
            label: 'Favorite Food',
            type: 'dropdown',
            options: [
              {text: 'Pizza', value: 'pizza'},
              {text: 'I am wrong', value: 'im-wrong'},
            ],
          },
          agree: {
            label: 'I Agree',
            type: 'checkbox',
          },
        }}
      >
        <Button.Submit>Submit</Button.Submit>
        <Button.Reset>Cancel</Button.Reset>
      </Form>
    );
  }
}

export default SchemaForm;
