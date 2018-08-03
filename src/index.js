import React, { Component } from "react";
import { render } from "react-dom";
import { Container, Header, Segment } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import ExampleForm from "./forms/ExampleForm";

class App extends Component {
  render() {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Header as="h2" attached="top" inverted>
          Formik-Semantic-UI
        </Header>

        <Segment attached>
          <ExampleForm />
        </Segment>
      </Container>
    );
  }
}

render(<App />, document.getElementById("root"));
