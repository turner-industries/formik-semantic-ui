import {getIn} from 'formik';

export const getFieldError = (field, form) => {
  const {name} = field;
  const {serverValidation} = form.status || {};
  const touched = getIn(form.touched, name);
  const checkTouched = serverValidation
    ? !touched
    : touched;
  return checkTouched && getIn(form.errors, name);
};

export const setFieldValue = (form, name, value, shouldValidate) => {
  form.setFieldValue(name, value, shouldValidate);
  form.setFieldTouched(name, true, shouldValidate);
};
