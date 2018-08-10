import React from 'react';
import {render, cleanup, fireEvent, wait} from 'react-testing-library';

import {Button, Form} from '../lib/index';

describe('Form', () => {
  afterEach(() => {
    cleanup();
  });

  it('child as a function', async () => {
    const handleSubmit = jest.fn();

    const {container, getByText} = render(
      <Form initialValues={{name: ''}} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <React.Fragment>
            <Button.Submit disabled={isSubmitting}>Submit</Button.Submit>
          </React.Fragment>
        )}
      </Form>
    );

    const submitButton = getByText('Submit');

    await fireEvent.click(submitButton);
    await fireEvent.click(submitButton);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });

    expect(handleSubmit.mock.calls.length).toEqual(1);
    expect(container).toMatchSnapshot();
  });

  it('render props', async () => {
    const {container, getByText} = render(
      <Form
        initialValues={{name: ''}}
        onSubmit={() => {}}
        render={({isSubmitting}) => (
          <React.Fragment>
            <Button.Submit disabled={isSubmitting}>Submit</Button.Submit>
          </React.Fragment>
        )}
      />
    );

    const submitButton = getByText('Submit');
    await fireEvent.click(submitButton);
    expect(container).toMatchSnapshot();
  });

  it('ignore loading', async () => {
    const {container, getByText} = render(
      <Form
        initialValues={{name: ''}}
        ignoreLoading
        onSubmit={() => {}}
        render={({isSubmitting}) => (
          <React.Fragment>
            <Button.Submit disabled={isSubmitting}>Submit</Button.Submit>
          </React.Fragment>
        )}
      />
    );

    const submitButton = getByText('Submit');
    await fireEvent.click(submitButton);
    expect(container).toMatchSnapshot();
  });
});
