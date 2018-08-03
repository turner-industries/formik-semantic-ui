import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { Formik } from "formik";
import { Form as SemanticForm } from "semantic-ui-react";

const FormikForm = ({
  className,
  inverted,
  size,
  ignoreLoading,
  children,
  render,
  component,
  ...formikProps
}) => {
  if (component) {
    console.error("The formik component prop is not supported in this wrapper");
    console.error(
      "Import the Formik control from the formik package to use this scenario"
    );
    throw new Error("Unsupported prop");
  }
  return (
    <Formik {...formikProps}>
      {renderProps => {
        const { handleSubmit, isSubmitting } = renderProps;
        return (
          <SemanticForm
            {...{ className, inverted, size }}
            onSubmit={handleSubmit}
            loading={isSubmitting && !ignoreLoading}
          >
            {typeof children === "function" || typeof render === "function"
              ? (render || children)(renderProps)
              : children}
          </SemanticForm>
        );
      }}
    </Formik>
  );
};

const Form = hoistNonReactStatics(FormikForm, SemanticForm);
Form.Children = React.Fragment;

export default Form;
