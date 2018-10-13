import React, {Fragment} from 'react';
import {Ref} from 'semantic-ui-react';

const findInput = (cb, el) => el && cb(el.querySelector('input'));

export const InputRef = ({inputRef, children}) => {
  const RefWrapper = inputRef ? Ref : Fragment;
  return (
    <RefWrapper innerRef={el => findInput(inputRef, el)}>{children}</RefWrapper>
  );
};
