import React from 'react';

// styles
import { Wrapper } from './DashView.styles';

interface Props {
  dispatch: React.Dispatch<ReducerActions>;
}

const DashView = (props: Props) => {
  return (
    <Wrapper>
      <div>DashView</div>
    </Wrapper>
  );
};

export default DashView;
