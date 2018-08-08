import React, {Component} from 'react';
import {render} from 'react-dom';
import {Container, Header, Segment} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import SimpleForm from './forms/SimpleForm';
import ExampleForm from './forms/ExampleForm';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as="h1">Formik-Semantic-UI</Header>
        <Container style={{paddingTop: 50}}>
          <Header as="h2" attached="top" inverted>
            Simple Form
          </Header>

          <Segment attached>
            <SimpleForm />
          </Segment>
        </Container>
        <Container style={{paddingTop: 50}}>
          <Header as="h2" attached="top" inverted>
            Simple Form with Data
          </Header>

          <Segment attached>
            <SimpleForm
              person={{
                emailAddress: 'jobney@turner-industries.com',
                firstName: 'Justin',
                lastName: 'Obney',
              }}
            />
          </Segment>
        </Container>
        <Container style={{paddingTop: 50}}>
          <Header as="h2" attached="top" inverted>
            Render/Child Function Props
          </Header>

          <Segment attached>
            <ExampleForm />
          </Segment>
        </Container>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
