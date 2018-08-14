import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {Formik} from 'formik';
import {Form as SemanticForm} from 'semantic-ui-react';

import FormikDropdown from './Dropdown';
import FormikTextArea from './TextArea';
import FormikCheckbox from './Checkbox';
import FormikInput from './Input';

const componentFactory = schema => {
  if (!schema) {
    return undefined;
  }

  const typeMap = {
    dropdown: FormikDropdown,
    textarea: FormikTextArea,
    checkbox: FormikCheckbox,
  };

  return Object.keys(schema).map(name => {
    const property = schema[name];
    const Component = typeMap[property.type] || FormikInput;
    const {type, value, ...props} = property;
    if (Component === FormikInput) {
      props.inputProps = props.inputProps || {};
      props.inputProps.type = type;
    }
    return <Component key={name} name={name} {...props} />;
  });
};

class FormikForm extends React.Component {
  state = {
    schemaComponents: componentFactory(this.props.schema),
  };

  render() {
    const {
      className,
      inverted,
      size,
      ignoreLoading,
      children,
      render,
      component,
      initialValues = {},
      ...formikProps
    } = this.props;

    if (component) {
      console.error(
        'The formik component prop is not supported in this wrapper'
      );
      console.error(
        'Import the Formik control from the formik package to use this scenario'
      );
      throw new Error('Unsupported prop');
    }

    const {schema = {}} = this.props;
    const mappedValues = Object.keys(schema || initialValues || {}).reduce(
      (acc, key) => {
        const property = schema[key] || {};
        acc[key] =
          property.value ||
          initialValues[key] ||
          (property.type === 'checkbox' ? false : '');
        return acc;
      },
      initialValues
    );

    return (
      <Formik {...{initialValues: mappedValues, ...formikProps}}>
        {renderProps => {
          const {handleSubmit, isSubmitting} = renderProps;
          return (
            <SemanticForm
              {...{className, inverted, size}}
              onSubmit={handleSubmit}
              loading={isSubmitting && !ignoreLoading}
            >
              {this.state.schemaComponents}
              {typeof children === 'function' || typeof render === 'function'
                ? (render || children)(renderProps)
                : children}
            </SemanticForm>
          );
        }}
      </Formik>
    );
  }
}

const Form = hoistNonReactStatics(FormikForm, SemanticForm);
Form.Children = React.Fragment;

export default Form;
