import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {connect} from 'formik';
import {Button as SemanticButton} from 'semantic-ui-react';

const Button = hoistNonReactStatics(
  props => <SemanticButton {...props} type="button" />,
  SemanticButton
);

Button.Submit = props => <SemanticButton primary {...props} type="submit" />;

Button.Reset = connect(({formik: {handleReset}, ...props}) => (
  <SemanticButton basic {...props} type="button" onClick={handleReset} />
));

export default Button;
