import React from 'react';

import Quote from './Quote';
import Date from './Date';
import ShowModalButton from './ShowModalButton';

const Header = () => {
  return (
    <header className="header">
      <div className="wrap">
        <ShowModalButton />
        <Quote />
      </div>
      <div className="header-inner">
        <div className="wrap">
          <Date />
        </div>
      </div>
    </header>
  );
};

export default Header;
