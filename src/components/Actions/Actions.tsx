import React from 'react';

// mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Wrapper } from './Actions.styles';
type Props = {};

const Actions = (props: Props) => {
  return (
    <Wrapper>
      Actions{' '}
      <Button>
        <Typography>Flip</Typography>
      </Button>
      <Button>
        <Typography>Reset</Typography>
      </Button>
      <Button>
        <Typography>Save</Typography>
      </Button>
    </Wrapper>
  );
};

export default Actions;
