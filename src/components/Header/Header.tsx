import React from 'react';

import { Wrapper } from './Header.styles';
import logo from '../../assets/rainbeau-logo.png';

const Header = () => {
  return (
    <Wrapper>
      <img src={logo} alt="rainbeau wordmark" />
    </Wrapper>
  );
};

export default Header;
