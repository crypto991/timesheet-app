import React, { Component } from "react";
import { connect } from "react-redux";

import { quoteAction } from "../actions";

class Quote extends Component {
  componentDidMount = () => {
    this.props.quoteAction();
  };

  render() {
    return (
      <div className="header-blockquote">
        <h1 className="header-quote">
          {this.props.quote.data ? this.props.quote.data.quote : null}
        </h1>
        <div className="header-cite">
          {this.props.quote.data ? this.props.quote.data.author : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quote: state.quote
  };
};

export default connect(
  mapStateToProps,
  { quoteAction }
)(Quote);
