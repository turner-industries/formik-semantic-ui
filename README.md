# formik-semantic-ui

Wrappers for [formik](https://github.com/jaredpalmer/formik) that simplify usage with [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React).

Benefits:
* No need to manage form state
* handles `onChange` for you
* Normalize all input events to provide a `value` (Ex: `value: true` for Checkbox instead of `checked`
* Easily handle showing validation messages from client or server
* REDUCES BOILERPLATE

**Install:** `npm i formik-semantic-ui`

Ex:

```js
<Form initialValues={{emailAddress:""}} onSubmit={(values, formikApi) => {
  api.save(values);
  formikApi.setFieldError('emailAdress', 'already in use')
}}>
  <Input label="Email" name="emailAddress" />

  <Button.Submit>Submit</Button.Submit>
  <Button.Reset>Cancel</Button.Reset>
</Form>
```

Demo:
- https://turner-industries.github.io/formik-semantic-ui/
- https://codesandbox.io/s/ywjoykw95x

## Components

### Input Components

- Input
- Dropdown
  - `options` can be passed to component directly or through `inputProps`
- Checkbox
- TextArea

props:

| Property       | Required | Default                             | Desc                                                                                                |
| -------------- | -------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| name           | required |                                     | formik property key <br /> checks `touched`, `errors`, and `values`                                 |
| id             | optional | `field_input_${count}`              | used to override default id put on component and associated via label                               |
| label          | optional | `undefined`                         | displays label on `<Form.Field>`                                                                    |
| inputProps     | optional | `{}`                                | props to be passed to matching Semantic-UI component. <br /> Ex: `{type:"password"}` on `<Input />` |
| fieldProps     | optional | `{}`                                | props passed to `<Form.Field />`                                                                    |
| errorComponent | optional | span with class `sui-error-message` | Use a component that receive a `message` prop (can be used also as a render prop)                   |
| inputRef       | optional |                                     | ref function to get handle to dom element (does not work on DropDown)                               |
| fast           | optional | false                               | whether to use formik's FastField (beneficial for large forms)                                      |

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
  - [Simple Usage](https://github.com/turner-industries/formik-semantic-ui/blob/master/example/src/forms/SimpleForm.js) - Components as children
  - [Enhanced Usage](https://github.com/turner-industries/formik-semantic-ui/blob/master/example/src/forms/ExampleForm.js) - "Render Prop" similar to default Formik "Render Prop"
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

## Creating Custom Components

### TODO: Create a better factory

Current:
- [DatePicker](https://github.com/turner-industries/formik-semantic-ui/blob/master/src/custom/DatePicker.js)
- [FileUpload](https://github.com/turner-industries/formik-semantic-ui/blob/master/src/custom/FileUpload.js)

## Schema Driven

### Basics
- Object `keys` map to component `name` prop
- Defaults to `Input` if type is unknown
- Unknown types pass their `type` to `Input type={type}`
- You can provide an initial value
- Very basic width via `fieldProps`


### TODO:
- Document this better
- Handle grouping

Usage:

```js
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
```
