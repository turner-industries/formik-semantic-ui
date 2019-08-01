import React from 'react';
import {fireEvent, render, cleanup} from 'react-testing-library';
import { Label } from 'semantic-ui-react';

import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Radio,
  TextArea,
} from '../index';
import {findAndClick} from '../test-utils';

const delay = ms =>
  new Promise(r => {
    setTimeout(() => {
      r();
    }, ms);
  });

class CustomErrorComponent extends React.Component {
  render() {
    const {message} = this.props;
    return (
      <Label basic color="red" pointing>{message}</Label>
    );
  }
}

describe('formik-semantic-ui', () => {
  afterEach(cleanup);

  describe('Input', () => {
    it('default ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Input label="Name" name="name" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('fast ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Input label="Name" name="name" fast={true} />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('with initial value ', () => {
      const {container} = render(
        <Form initialValues={{name: 'Justin'}}>
          <Input label="Name" name="name" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('field level validation', async () => {
      const validateName = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{name: 'Justin'}}>
          <Input label="Name" name="name" validate={validateName} />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });

    it('with custom error component ', async () => {
      const validateName = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{name: 'Justin'}}>
          <Input
            label="Name"
            name="name"
            validate={validateName}
            errorComponent={CustomErrorComponent}
          />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });

    it('without label and with custom "id" ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Input name="name" id="my-custom-id" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('with custom "id" ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Input label="Name" name="name" id="my-custom-id" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('with input props and field props ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Input
            label="Name"
            name="name"
            inputProps={{type: 'password'}}
            fieldProps={{width: '8'}}
          />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('ability to add additional onChange handlers', async () => {
      const onChange = jest.fn();
      const {getByLabelText} = render(
        <Form initialValues={{name: ''}}>
          <Input
            label="Name"
            name="name"
            inputProps={{
              onChange: (e, {name, value}) => onChange({name, value}),
            }}
          />
        </Form>
      );
      const input = getByLabelText('Name');
      fireEvent.change(input, {target: {value: 'Test'}});
      await delay(10);
      expect(onChange).toHaveBeenCalledWith({name: 'name', value: 'Test'});
    });

    it('inputRef ', () => {
      let ref;

      render(
        <Form initialValues={{name: ''}}>
          <Input label="Name" name="name" inputRef={el => (ref = el)} />
        </Form>
      );

      expect(ref.focus).toBeDefined();
    });
  });

  describe('Checkbox', () => {
    it('default ', () => {
      const {container} = render(
        <Form initialValues={{checked: true}}>
          <Checkbox label="Checked" name="checked" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('fast ', () => {
      const {container} = render(
        <Form initialValues={{checked: true}}>
          <Checkbox label="Checked" name="checked" fast={true} />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('inputRef', () => {
      let ref;

      render(
        <Form initialValues={{name: false}}>
          <Checkbox label="Name" name="name" inputRef={el => (ref = el)} />
        </Form>
      );

      expect(ref.focus).toBeDefined();
    });

    it('field level validation ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{checked: true}}>
          <Checkbox label="Checked" name="checked" validate={validateField} />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });

    it('with custom error component ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{checked: true}}>
          <Checkbox
            label="Checked"
            name="checked"
            validate={validateField}
            errorComponent={CustomErrorComponent}
          />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });
  });

  describe('Radio', () => {
    it('default ', () => {
      const {container} = render(
        <Form initialValues={{checked: 1}}>
          <Radio label="Checked" name="checked" value={1} />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('fast ', () => {
      const {container} = render(
        <Form initialValues={{checked: 1}}>
          <Radio label="Checked" name="checked" value={1} fast={true} />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('inputRef', () => {
      let ref;

      render(
        <Form initialValues={{name: ''}}>
          <Radio label="Name" name="name" inputRef={el => (ref = el)} />
        </Form>
      );

      expect(ref.focus).toBeDefined();
    });

    it('field level validation ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{checked: true}}>
          <Checkbox
            label="Checked"
            name="checked"
            value={1}
            validate={validateField}
          />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });

    it('with custom error component ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{checked: 1}}>
          <Radio
            label="Checked"
            name="checked"
            value={1}
            validate={validateField}
            errorComponent={CustomErrorComponent}
          />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });
  });

  describe('TextArea', () => {
    it('default ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <TextArea label="Name" name="name" />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('fast ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <TextArea label="Name" name="name" fast={true} />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('inputRef', () => {
      let ref;

      render(
        <Form initialValues={{name: ''}}>
          <TextArea label="Name" name="name" inputRef={el => (ref = el)} />
        </Form>
      );

      expect(ref.focus).toBeDefined();
    });

    it('field level validation ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{name: ''}}>
          <TextArea label="Name" name="name" validate={validateField} />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });

    it('with custom error component ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{name: ''}}>
          <TextArea
            label="Name"
            name="name"
            validate={validateField}
            errorComponent={CustomErrorComponent}
          />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });
  });

  describe('Dropdown', () => {
    it('default ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Dropdown
            label="Name"
            name="name"
            options={[
              {text: 'Justin', value: 'justin'},
              {text: 'Not Justin', value: 'not-justin'},
            ]}
          />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('fast ', () => {
      const {container} = render(
        <Form initialValues={{name: ''}}>
          <Dropdown
            label="Name"
            name="name"
            options={[
              {text: 'Justin', value: 'justin'},
              {text: 'Not Justin', value: 'not-justin'},
            ]}
            fast={true}
          />
        </Form>
      );
      expect(container).toMatchSnapshot();
    });

    it('field level validation ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{name: ''}}>
          <Dropdown
            label="Name"
            name="name"
            options={[
              {text: 'Justin', value: 'justin'},
              {text: 'Not Justin', value: 'not-justin'},
            ]}
            validate={validateField}
          />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });

    it('with custom error component ', async () => {
      const validateField = jest.fn(() => {
        return 'Error fam';
      });
      const {container, getByText} = render(
        <Form initialValues={{name: ''}}>
          <Dropdown
            label="Name"
            name="name"
            options={[
              {text: 'Justin', value: 'justin'},
              {text: 'Not Justin', value: 'not-justin'},
            ]}
            validate={validateField}
            errorComponent={CustomErrorComponent}
          />
          <Button.Submit>Save</Button.Submit>
        </Form>
      );

      await findAndClick(() => getByText('Save'));
      expect(container).toMatchSnapshot();
    });
  });
});
