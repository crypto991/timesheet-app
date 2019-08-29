import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  modalFormNameAction,
  modalFormHoursAction,
  modalToggleShowAction,
  modalTargetIdAction,
  modalResetFormAction,
  submitModalFormAction
} from '../actions';

class Modal extends Component {
  state = {
    isVisible: false
  };

  componentDidMount = () => {
    if (this.props.id && this.props.hours && this.props.name) {
      modalTargetIdAction(this.props.id, this.props.hours, this.props.name);
    }

    setTimeout(
      () =>
        this.setState({
          isVisible: true
        }),
      20
    );
  };

  componentWillUnmount = () => {
    this.props.modalTargetIdAction(null, '', '');
  };

  //=================================================================================

  handleHoursInput = e => {
    if (e.target.value * 1) {
      return this.props.modalFormHoursAction(e.target.value);
    } else if (e.target.value * 1 < 1) {
      return this.props.modalFormHoursAction('');
    } else return;
  };

  //=================================================================================

  totalTasksHours = () => {
    let totalTasksHours = 0;
    this.props.tasks.forEach(task => (totalTasksHours += task.hours));

    if (this.props.targetId) {
      // eslint-disable-next-line
      this.props.tasks.map(task => {
        if (task.id === this.props.targetId) {
          totalTasksHours -= task.hours;
        }
      });
    }

    return totalTasksHours;
  };

  //=================================================================================

  formEnable = () => {
    let totalTasksHours = this.totalTasksHours();

    if (totalTasksHours + this.props.modalFormHours * 1 <= this.props.totalHours && this.props.modalFormHours && this.props.modalFormName) {
      return false;
    } else return true;
  };

  removeModal = () => {
    this.props.modalToggleShowAction();
  };

  //=================================================================================

  handleSubmit = event => {
    event.preventDefault();
    const action = {
      title: this.props.modalFormName,
      hours: this.props.modalFormHours,
      date: this.props.date
    };
    if (this.props.targetId) action.id = this.props.targetId;

    this.props.submitModalFormAction(action);
  };

  render() {
    const totalTasksHours = this.totalTasksHours();
    return (
      <div
        className={`modal-wrap js-modal ${this.state.isVisible ? 'is-visible' : null}`}
        onClick={() => {
          this.removeModal();
        }}
      >
        <div className="modal js-modal-inner" onClick={e => e.stopPropagation()}>
          <h2>Create a task:</h2>
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className="field-wrap">
              <label className="label">Title:</label>
              <input
                className="field"
                type="text"
                value={this.props.modalFormName}
                onChange={e => this.props.modalFormNameAction(e.target.value)}
                placeholder="Enter title here..."
              />
            </div>

            {/*==================================================*/}

            <div className="field-wrap">
              <label className="label">Hours:</label>
              <input
                className="field"
                type="text"
                placeholder="Add hours here..."
                value={this.props.modalFormHours}
                onChange={e => this.handleHoursInput(e)}
              />

              {/*==================================================*/}

              {totalTasksHours + this.props.modalFormHours * 1 > this.props.totalHours ? (
                <span style={{ color: 'red' }}>tasks must not exceed total hours</span>
              ) : null}
            </div>
            <div className="btn-wrap align-right">
              {/*==================================================*/}

              <input
                className="btn"
                type="submit"
                value="Create"
                disabled={this.formEnable()}
                style={this.formEnable() ? { backgroundColor: '#9c9c9c ' } : null}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalShow: state.modal.modalShow,
    targetId: state.modal.targetId,
    modalFormName: state.modal.modalForm.modalFormName,
    modalFormHours: state.modal.modalForm.modalFormHours,
    tasks: state.tasks.data,
    totalHours: state.totalHours,
    date: state.date
  };
};

export default connect(
  mapStateToProps,
  {
    modalFormHoursAction,
    modalFormNameAction,
    modalResetFormAction,
    modalToggleShowAction,
    modalTargetIdAction,
    submitModalFormAction
  }
)(Modal);
