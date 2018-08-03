import React, { Component } from "react";
import { Form, Header, Icon, Progress, Segment } from "semantic-ui-react";
import { Field } from "formik";
import Dropzone from "react-dropzone";
// import p from "prop-types";

const validFileStyle = {
  borderColor: "blue"
};

const invalidFileStyle = {
  borderColor: "red"
};

const emptyStyle = {};

let fieldCounter = 0;
class FileUpload extends Component {
  state = {
    uploading: false,
    progress: 0
  };

  constructor(props) {
    super(props);
    this.id = props.id || `field_fileupload_${fieldCounter++}`;
  }

  _onDrop = form => {
    const { name } = this.props;
    this.setState({ uploading: true, progress: 0 }, () => {
      this._counter = setInterval(() => {
        this.setState(
          state => ({
            progress: state.progress + 10
          }),
          () => {
            if (this.state.progress >= 100) {
              clearInterval(this._counter);
              form.setFieldValue(name, "url://some_url", true);
              this.setState({ uploading: false });
            }
          }
        );
      }, 150);
    });
  };

  render() {
    const { name, label, fieldProps = {}, inputProps = {} } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <Dropzone
                accept="image/png"
                style={emptyStyle}
                {...inputProps}
                multiple={false}
                onDrop={acceptedFiles => {
                  if (acceptedFiles.length) {
                    this._onDrop(form);
                  }
                }}
              >
                {({ isDragActive, isDragReject, acceptedFiles }) => {
                  const wrapperStyle = {
                    border: "1px dashed rgba(34,36,38,.15)",
                    boxShadow: "none",
                    cursor: "copy",
                    ...(isDragActive ? validFileStyle : emptyStyle),
                    ...(isDragReject || error ? invalidFileStyle : emptyStyle)
                  };
                  const { uploading, progress } = this.state;
                  const file = [...acceptedFiles].pop();
                  const hasFile = !!file && !uploading && field.value;
                  const color = hasFile
                    ? "green"
                    : isDragActive || uploading
                      ? "blue"
                      : "grey";

                  const showProgress = !!progress && (hasFile || uploading);

                  return (
                    <Segment style={wrapperStyle}>
                      {showProgress && (
                        <Progress
                          percent={progress}
                          attached="top"
                          autoSuccess
                          color="blue"
                        />
                      )}
                      <Header
                        icon
                        textAlign="center"
                        size="small"
                        color={color}
                      >
                        <Icon name="cloud upload" color={color} />
                        <Header.Content>
                          {file && (hasFile || uploading) ? (
                            <React.Fragment>
                              {file.name} - {file.size} bytes
                              <Header.Subheader>
                                {uploading ? "Uploading.." : "Uploaded"}.
                              </Header.Subheader>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              Drag Files Here
                              <Header.Subheader>
                                Or click to browse
                              </Header.Subheader>
                            </React.Fragment>
                          )}
                        </Header.Content>
                      </Header>
                    </Segment>
                  );
                }}
              </Dropzone>
              {form.errors[name] &&
                form.touched[name] && (
                  <span
                    style={{
                      display: "block",
                      margin: ".28571429rem 0",
                      color: "rgb(159, 58, 56)",
                      fontSize: ".92857143em"
                    }}
                  >
                    {form.errors[name]}
                  </span>
                )}
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FileUpload;
