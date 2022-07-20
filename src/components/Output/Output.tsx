import React from 'react';

// mui
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { Wrapper, TextArea } from './Output.styles';
type Props = {};

const Output = (props: Props) => {
  return (
    <Wrapper>
      <div>Output</div>
      <div>css scss tailwind mui styled emotion</div>
      <TextArea />
    </Wrapper>
  );
};

export default Output;
