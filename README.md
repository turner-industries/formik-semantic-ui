# formik-semantic-ui

Wrappers for [formik](https://github.com/jaredpalmer/formik) that simplify usage with [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React).

**Install:** `npm i formik-semantic-ui`

Demo: https://codesandbox.io/s/ywjoykw95x

## Components

### Input Components

- Input
- Dropdown
  - `options` can be passed to component directly or through `inputProps`
- Checkbox
- TextArea

props:

| Property   | Required | Default                | Desc                                                                                                |
| ---------- | -------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| name       | required |                        | formik property key <br /> checks `touched`, `errors`, and `values`                                 |
| id         | optional | `field_input_${count}` | used to override default id put on component and associated via label                               |
| label      | optional | `undefined`            | displays label on `<Form.Field>`                                                                    |
| inputProps | optional | `{}`                   | props to be passed to matching Semantic-UI component. <br /> Ex: `{type:"password"}` on `<Input />` |
| fieldProps | optional | `{}`                   | props passed to `<Form.Field />`                                                                    |

Produce Semantic-UI:

```js
<Form.Field error={checks errors}>
  <label />
  <CONNECTED_FORMIK_COMPONENT /> /* Example <Input /> */
  <span className="sui-error-message">Some error message</span>
</Form.Field>
```

### Form Helpers

`<Form />`

- Usage
  - [Simple Usage](#simple-usage) - Components as children
  - Enhanced Usage - "Render Prop" similar to default Formik "Render Prop"
    - `render={formikProps => <Form />}`
    - function as a child
- Automatically binds Formik `handleSubmit` for Semantic UI Form `onSubmit`
- Automatically binds Formik `isSubmitting` for Semantic UI Form `loading`
- `ignoreLoading` - if you wish to disconnect the Forms `loading` prop from `isSubmitting`
- Accepts all `<Formik />` props EXCEPT `component`
- Accepts the following props from Semantic UI `<Form />`
  - className
  - inverted
  - size

Ex:
```js
<Form
  {...props}
  onSubmit={handleSubmit}
  loading={!props.ignoreLoading && isSubmitting}
/>
```

`<Form.Children />` - alias for `<React.Fragment>` to better show intent when using render prop

## Buttons

- Button - `<Button {...props} type="button" />`
- Button.Submit - `<Button primary {...props} type="submit"  />`
- Button.Reset - `<Button basic {...props} type="button" onClick={handleReset} />` 

## Simple Usage

```js
import React, { Component } from "react";
import { Button, Form, Input } from "formik-semantic-ui";

class SimpleForm extends Component {
  static defaultProps = {
    person: {
      emailAddress: "",
      firstName: "",
      lastName: ""
    }
  };
  _handleSubmit = (values, formikApi) => {
    // Make API Call
    console.log(values, formikApi);
    // Handle response / Errors
    formikApi.setFieldError("emailAddress", "Invalid Email");
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
```

## Creating Custom Components

TODO: Create a better factory

Current:
- [DatePicker](https://github.com/turner-industries/formik-semantic-ui/blob/master/src/custom/DatePicker.js)
- [FileUpload](https://github.com/turner-industries/formik-semantic-ui/blob/master/src/custom/FileUpload.js)