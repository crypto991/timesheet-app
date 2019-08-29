import React from 'react';
import { connect } from 'react-redux';

const Date = props => {
  return (
    <div className="date-wrap">
      <img className="icon" src="./icons/icon-calendar.svg" alt="Calendar" />
      <time>{props.date ? props.date.toString().replace(/-/g, ' / ') : null}</time>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    date: state.date
  };
};

export default connect(mapStateToProps)(Date);
