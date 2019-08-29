import { combineReducers } from 'redux';

import getDate from '../utils/getDate';

//==========================================================

export const totalHoursReducer = (state = 8, action) => {
  if (action.type === 'SET_TOTAL') {
    return action.payload;
  } else return state;
};

//==========================================================

export const dateReducer = (date = getDate(), action) => {
  if (action.type === 'DATE') {
    return action.payload;
  }

  return date;
};

//==========================================================

export const quoteReducer = (quote = '', action) => {
  const newQuote = action.payload;

  switch (action.type) {
    case 'QUOTE':
      return newQuote;
    case 'ERROR':
      return 'ERROR WITH REQUEST TO QUOTE API';
    default:
      return quote;
  }
};

//==========================================================

const tasksInitialState = {
  loading: false,
  data: []
};

export const tasksReducers = (state = tasksInitialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, data: state.tasks };
    case 'GET_ALL_TASKS':
      return { loading: false, data: action.payload };
    case 'ADD_TASK':
      return { loading: false, data: action.payload.tasks };
    case 'DELETE_TASK':
      return {
        loading: false,
        data: state.data.filter(task => task.id !== action.payload)
      };

    case 'ERROR':
      return state;
    default:
      return state;
  }
};

//==============================================================

const modalSetInitialState = {
  modalShow: false,
  targetId: null,
  modalForm: {
    modalFormName: '',
    modalFormHours: ''
  }
};

export const modalReducer = (state = modalSetInitialState, action) => {
  switch (action.type) {
    case 'MODAL_SHOW_TOGGLE':
      return { ...state, modalShow: !state.modalShow };

    case 'MODAL_TARGET_ID':
      return {
          modalShow: state.modalShow,
          targetId: action.payload.id,
          modalForm: {
          modalFormName: action.payload.name,
          modalFormHours: action.payload.hours
        }
      };

    case 'MODAL_FORM_UPDATE_NAME':
      return {
        ...state,
        modalForm: {
          modalFormName: action.payload,
          modalFormHours: state.modalForm.modalFormHours
        }
      };

    case 'MODAL_FORM_UPDATE_HOURS':
      return {
        ...state,
        modalForm: {
          modalFormHours: action.payload,
          modalFormName: state.modalForm.modalFormName
        }
      };

    case 'MODAL_RESET_FORM':
      return modalSetInitialState;
    default:
      return state;
  }
};

//==============================================================

export default combineReducers({
  modal: modalReducer,
  date: dateReducer,
  quote: quoteReducer,
  tasks: tasksReducers,
  totalHours: totalHoursReducer
});
