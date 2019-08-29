import React, { Component } from 'react';
import { connect } from 'react-redux';

import Task from './Task';

import { getAllTasksAction } from '../actions';

class TaskList extends Component {
  componentDidMount = () => {
    this.props.getAllTasksAction(this.props.date);
  };
  render() {
    return (
      <div>
        {!this.props.tasks
          ? null
          : this.props.tasks.map(task => {
              return <Task id={task.id} key={task.id} name={task.title} hours={task.hours} />;
            })}
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    date: state.date,
    tasks: state.tasks.data
  };
};

export default connect(
  mapStateTopProps,
  { getAllTasksAction }
)(TaskList);
