import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTotalHoursAction } from '../actions';

class Total extends Component {
  state = {
    totalForm: '',
    warning: false,
    defaultTotal: true,
    setTotal: false,
    lessThanTotalTasksHours: false
  };

  totalInputHandler = e => {
    this.setState({ defaultTotal: false });
    this.setState({ totalForm: e.target.value });

    if (e.target.value < this.totalTasksHours()) {
      this.setState({ lessThanTotalTasksHours: true });
    } else {
      this.setState({ lessThanTotalTasksHours: false });
    }

    if (e.target.value <= 24) {
      this.setState({ warning: false });
    } else
      return this.setState({
        warning: true
      });
  };

  //=================================================

  totalTasksHours = () => {
    let totalTasksHours = 0;
    this.props.tasks.forEach(task => (totalTasksHours += task.hours));

    return totalTasksHours;
  };

  //==================================================

  totalSubmitHandler = event => {
    event.preventDefault();

    this.setState({
      warning: false
    });

    this.props.setTotalHoursAction({
      date: this.props.date,
      totalHours: this.state.totalForm
    });
    this.setState({ setTotal: true });

    console.log(this.state.totalForm);

    setTimeout(() => this.setState({ setTotal: false }), 5000);
  };

  render() {
    return (
      <form
        className="total align-right"
        onSubmit={event => {
          this.totalSubmitHandler(event);
        }}
        ref={el => (this.myFormRef = el)}
      >
        {!this.state.warning ? null : (
          <span style={{ color: 'red', fontSize: '12px', marginRight: '10px' }}>total must be higher than 1h and lower than 20h</span>
        )}
        {!this.state.lessThanTotalTasksHours ? null : (
          <span style={{ color: 'red', fontSize: '12px', marginRight: '10px' }}>total must be higher than total of existing tasks</span>
        )}
        {!this.state.setTotal ? null : (
          <span style={{ color: 'green', fontSize: '12px', marginRight: '10px' }}>new total successfully set</span>
        )}
        <label className="total-label">Total:</label>
        <input
          className="total-input"
          type="text"
          value={!this.state.totalForm && this.state.defaultTotal ? this.props.total : this.state.totalForm}
          onChange={e => this.totalInputHandler(e)}
        />
        <input type="submit" style={{ display: 'none' }} disabled={this.state.lessThanTotalTasksHours || this.state.warning} />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    total: state.totalHours,
    date: state.date,
    tasks: state.tasks.data
  };
};

export default connect(
  mapStateToProps,
  { setTotalHoursAction }
)(Total);
