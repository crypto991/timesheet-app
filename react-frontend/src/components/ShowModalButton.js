import React from "react";
import { connect } from "react-redux";
import { modalToggleShowAction } from "../actions";

const ShowModalButton = props => {
  return (
    <div className="btn-icon" onClick={props.modalToggleShowAction}>
      <img
        className="icon icon-plus js-modal-init"
        src="./icons/icon-plus.svg"
        alt="Add New Item"
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    modalShow: state.modal.modalShow
  };
};

export default connect(
  mapStateToProps,
  { modalToggleShowAction }
)(ShowModalButton);
