var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { Field } from "formik";

var fieldCounter = 0;

var FormikDropdown = function (_Component) {
  _inherits(FormikDropdown, _Component);

  function FormikDropdown(props) {
    _classCallCheck(this, FormikDropdown);

    var _this = _possibleConstructorReturn(this, (FormikDropdown.__proto__ || Object.getPrototypeOf(FormikDropdown)).call(this, props));

    _this.id = props.id || "field_dropdown_" + fieldCounter++;
    return _this;
  }

  _createClass(FormikDropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.name,
          label = _props.label,
          options = _props.options,
          _props$inputProps = _props.inputProps,
          inputProps = _props$inputProps === undefined ? {} : _props$inputProps,
          _props$fieldProps = _props.fieldProps,
          fieldProps = _props$fieldProps === undefined ? {} : _props$fieldProps;

      return React.createElement(Field, {
        name: name,
        render: function render(_ref) {
          var field = _ref.field,
              form = _ref.form;

          var error = form.touched[name] && form.errors[name];
          return React.createElement(
            Form.Field,
            Object.assign({ error: !!error }, fieldProps),
            !!label && React.createElement(
              "label",
              { htmlFor: _this2.id, onClick: function onClick() {
                  return _this2._dropdown.open();
                } },
              label
            ),
            React.createElement(Dropdown, Object.assign({
              ref: function ref(el) {
                return _this2._dropdown = el;
              },
              id: _this2.id,
              name: name,
              options: options,
              selectOnBlur: false,
              selectOnNavigation: false,
              selection: true
            }, inputProps, {
              value: field.value,
              onChange: function onChange(e, _ref2) {
                var name = _ref2.name,
                    value = _ref2.value;

                form.setFieldValue(name, value, true);
              }
            })),
            form.errors[name] && form.touched[name] && React.createElement(
              "span",
              {
                style: {
                  display: "block",
                  margin: ".28571429rem 0",
                  color: "rgb(159, 58, 56)",
                  fontSize: ".92857143em"
                }
              },
              form.errors[name]
            )
          );
        }
      });
    }
  }]);

  return FormikDropdown;
}(Component);

export default FormikDropdown;