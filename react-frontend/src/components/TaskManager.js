import React from "react";
import Header from "./Header";
import { connect } from "react-redux";

import { dateAction } from "../actions";
import TaskList from "./TaskList";
import Modal from "./Modal";
import Footer from "./Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Total from "./Total";

class TaskManager extends React.Component {
  componentWillMount = () => {
    if (this.props.match.params.date) {
      this.props.dateAction(this.props.match.params.date);
    }
  };

  render() {
    return (
      <div id="content">
        <Header />
        <main className="main" style={{ marginBottom: "2em" }}>
          <div className="wrap" syle={{ position: "relative" }}>
            {this.props.tasks[0] ? null : (
              <span
                style={{
                  position: "absolute",

                  color: "#666"
                }}
              >
                Add your tasks..
              </span>
            )}
            {this.props.loading ? <CircularProgress size={20} /> : null}
            <TaskList />
            <Total />
          </div>
          {this.props.modalShow ? <Modal /> : null}
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: state.date,
    tasks: state.tasks.data,
    loading: state.tasks.loading,
    modalShow: state.modal.modalShow
  };
};

export default connect(
  mapStateToProps,
  { dateAction }
)(TaskManager);
