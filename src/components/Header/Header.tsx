import React from 'react';

import { Wrapper, Logo } from './Header.styles';
import logo from '../../assets/rainbeau-logo.png';

const Header = () => {
  return (
    <Wrapper>
      <Logo src={logo} logoWidth={160} alt="rainbeau wordmark" />
    </Wrapper>
  );
};

export default Header;
