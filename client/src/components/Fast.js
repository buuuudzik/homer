import React, { Component } from "react";
import { Paper } from "@material-ui/core";

export default class Fast extends Component {
  render() {
    return (
      <div>
        <Paper style={{ padding: 10 }}>
          <div>Pod ręką:</div>
          <div>{this.props.children}</div>
        </Paper>
      </div>
    );
  }
}
