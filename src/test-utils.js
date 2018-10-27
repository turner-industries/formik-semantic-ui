import {fireEvent, waitForElement} from 'react-testing-library';

const delay = async () => new Promise(r => setTimeout(r, 0));

export const findAndClick = async (locatorFunction, eventProperties = {}) => {
  await fireEvent.click(await waitForElement(locatorFunction), eventProperties);
  await delay();
};

export const setFieldValue = async (formField, value, eventProperties = {}) => {
  await fireEvent.change(formField, {target: {value, ...eventProperties}});
};
