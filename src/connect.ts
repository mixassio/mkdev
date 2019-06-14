import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "./actions";

export default (mapStateToProps: any) => (Component: React.ComponentType) =>
  connect(
    mapStateToProps,
    actionCreators
  )(Component);
