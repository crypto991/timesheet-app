import React, { Component } from 'react';
import { connect } from 'react-redux';

import { modalTargetIdAction, removeTaskAction, modalToggleShowAction } from '../actions';

class Task extends Component {
  deleteTaskHandler = e => {
    this.setState({ deleted: true });
    e.stopPropagation();
    this.props.removeTaskAction({
      id: this.props.id,
      date: this.props.date
    });
  };

  updateTask = () => {
    this.props.modalTargetIdAction(this.props.id, this.props.hours, this.props.name);

    this.props.modalToggleShowAction();
  };

  render() {
    return (
      <div
        className="item-row"
        style={{ position: 'relative' }}
        onClick={() => {
          this.updateTask();
        }}
        key={this.props.id}
      >
        <div className="check-flag">
          <span className="small-text-label">Title</span>
          <span className="small-text-label hours">Hours</span>
          <span className="check-flag-label">{this.props.name}</span>
          <span className="hours-box">{this.props.hours}</span>
        </div>
        <span
          style={{
            color: 'red',
            fontSize: '16px',
            position: 'absolute',
            top: '2px',
            right: '10px',
            cursor: 'pointer'
          }}
          onClick={e => this.deleteTaskHandler(e)}
        >
          x
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: state.date
  };
};

export default connect(
  mapStateToProps,
  { modalTargetIdAction, removeTaskAction, modalToggleShowAction }
)(Task);
