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

  describe('Schema', () => {
    it('Input', () => {
      const schema = {
        name: {
          type: 'text',
          label: 'Name',
        },
      };

      const {container} = render(
        <Form initialValues={{name: ''}} onSubmit={() => {}} schema={schema}>
          <Button.Submit>Submit</Button.Submit>
        </Form>
      );

      expect(container).toMatchSnapshot();
    });

    it('Input with value', () => {
      const schema = {
        name: {
          type: 'text',
          label: 'Name',
          value: 'Justin',
        },
      };

      const {container} = render(
        <Form initialValues={{name: ''}} onSubmit={() => {}} schema={schema}>
          <Button.Submit>Submit</Button.Submit>
        </Form>
      );

      expect(container).toMatchSnapshot();
    });

    it('Input: inputProps & fieldProps', () => {
      const schema = {
        ssn: {
          type: 'password',
          label: 'SSN',
          inputProps: {
            placeholder: 'SSN',
          },
          fieldProps: {
            width: '8',
          },
        },
      };

      const {container} = render(
        <Form initialValues={{name: ''}} onSubmit={() => {}} schema={schema}>
          <Button.Submit>Submit</Button.Submit>
        </Form>
      );

      expect(container).toMatchSnapshot();
    });

    it('TextArea', () => {
      const schema = {
        notes: {
          type: 'textarea',
          label: 'Notes',
        },
      };

      const {container} = render(
        <Form initialValues={{name: ''}} onSubmit={() => {}} schema={schema}>
          <Button.Submit>Submit</Button.Submit>
        </Form>
      );

      expect(container).toMatchSnapshot();
    });

    it('Checkbox', () => {
      const schema = {
        agree: {
          type: 'checkbox',
          label: 'I Agree',
        },
      };

      const {container} = render(
        <Form initialValues={{name: ''}} onSubmit={() => {}} schema={schema}>
          <Button.Submit>Submit</Button.Submit>
        </Form>
      );

      expect(container).toMatchSnapshot();
    });

    it('Dropdown', () => {
      const schema = {
        name: {
          type: 'dropdown',
          label: 'Name',
          options: [
            {text: 'Justin', value: 'justin'},
            {text: 'Not Justin', value: 'not-justin'},
          ],
        },
      };

      const {container} = render(
        <Form initialValues={{name: ''}} onSubmit={() => {}} schema={schema}>
          <Button.Submit>Submit</Button.Submit>
        </Form>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
