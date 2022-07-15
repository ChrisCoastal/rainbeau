import React from 'react';

import { Wrapper } from './Header.styles';

type Props = {};

const Header = (props: Props) => {
  return (
    <Wrapper>
      <p>RAINBEAU</p>
      <div>
        <a href="#">LOGIN</a>
      </div>
    </Wrapper>
  );
};

export default Header;
