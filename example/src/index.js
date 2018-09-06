import React, {Component} from 'react';
import {render} from 'react-dom';
import {Container, Header, Segment, Tab} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import SimpleForm from './forms/SimpleForm';
import ExampleForm from './forms/ExampleForm';
import SchemaForm from './forms/SchemaForm';

const panes = [
  {
    menuItem: 'Simple Form',
    render: () => (
      <Tab.Pane attached={false}>
        <SimpleForm key="default" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Simple Form with Data',
    render: () => (
      <Tab.Pane attached={false}>
        <SimpleForm
          key="with-data"
          person={{
            emailAddress: 'jobney@turner-industries.com',
            firstName: 'Justin',
            lastName: 'Obney',
            checkbox: true,
            radio: 2,
          }}
        />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Render/Child Function Props',
    render: () => (
      <Tab.Pane attached={false}>
        <ExampleForm />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Schema Form',
    render: () => (
      <Tab.Pane attached={false}>
        <SchemaForm />
      </Tab.Pane>
    ),
  },
];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <br />
          <Header as="h1">Formik-Semantic-UI</Header>
          <Segment>
            <Tab menu={{secondary: true, pointing: true}} panes={panes} />
          </Segment>
        </Container>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
