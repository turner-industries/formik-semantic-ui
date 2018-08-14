import React from 'react';
import {render, cleanup} from 'react-testing-library';

import {Button, Form} from '../index';

describe('Buttons', () => {
  afterEach(() => {
    cleanup();
  });

  it('default', () => {
    const {container} = render(
      <Form initialValues={{name: ''}}>
        <Button>Basic Button</Button>
      </Form>
    );
    expect(container).toMatchSnapshot();
  });

  it('Button.Submit', () => {
    const {container} = render(
      <Form initialValues={{name: ''}}>
        <Button.Submit>Basic Button</Button.Submit>
      </Form>
    );
    expect(container).toMatchSnapshot();
  });

  it('Button.Reset', () => {
    const {container} = render(
      <Form initialValues={{name: ''}}>
        <Button.Reset>Basic Button</Button.Reset>
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
