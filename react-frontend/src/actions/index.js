import axios from 'axios';

export const dateAction = date => {
  return {
    type: 'DATE',
    payload: date
  };
};

export const quoteAction = () => {
  return async dispatch => {
    try {
      const quote = await axios.get('http://localhost:8080/api/quotes');
      dispatch({
        type: 'QUOTE',
        payload: quote
      });
    } catch (err) {
      dispatch({
        type: 'ERROR'
      });
    }
  };
};

//===========TASKS_ACTIONS==============================

export const saveTaskAction = action => {
  return async dispatch => {
    try {
      if (!action.id) {
        const post = await axios.post(`http://localhost:8080/api/timesheet/${action.date}`, action);

        return dispatch({
          type: 'ADD_TASK',
          payload: { tasks: post.data, date: action.date }
        });
      } else {
        const put = await axios.put(`http://localhost:8080/api/timesheet/${action.date}`, action);
        dispatch({
          type: 'ADD_TASK',
          payload: { tasks: put.data, date: action.date }
        });
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err
      });
    }
  };
};

export const getAllTasksAction = date => {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8080/api/timesheet/${date}`);
      dispatch({
        type: 'GET_ALL_TASKS',
        payload: response.data
      });

      dispatch({
        type: 'SET_TOTAL',
        payload: response.data[0].totalHours
      });
    } catch (err) {
      dispatch({
        type: 'ERROR'
      });
    }
  };
};

export const removeTaskAction = action => {
  const { id } = action;
  return async dispatch => {
    await axios.delete(`http://localhost:8080/api/timesheet/${id}`);

    dispatch({
      type: 'DELETE_TASK',
      payload: id
    });
  };
};

export const setTotalHoursAction = action => {
  const { totalHours, date } = action;
  return async dispatch => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/timesheet/${date}`, {
        totalHours
      });
      dispatch({
        type: 'SET_TOTAL',
        payload: response.totalHours
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//==================MODAL============================

export const modalToggleShowAction = () => {
  return {
    type: 'MODAL_SHOW_TOGGLE'
  };
};

export const modalTargetIdAction = (id, hours, name) => {
  return {
    type: 'MODAL_TARGET_ID',
    payload: { id, hours, name }
  };
};

export const modalFormHoursAction = input => {
  return {
    type: 'MODAL_FORM_UPDATE_HOURS',
    payload: input
  };
};

export const modalFormNameAction = input => {
  return {
    type: 'MODAL_FORM_UPDATE_NAME',
    payload: input
  };
};

export const modalResetFormAction = () => {
  return {
    type: 'MODAL_RESET_FORM'
  };
};

//====================SUBMIT_MODAL_FORM===============================

export const submitModalFormAction = action => {
  return async dispatch => {
    await dispatch(modalResetFormAction());
    await dispatch(saveTaskAction(action));
  };
};
