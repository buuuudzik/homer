import React, { Component } from "react";
import { Paper, Button, Typography } from "@material-ui/core";

export default class Fast extends Component {
  state = {
    show: false,
  };
  render() {
    return (
      <div>
        <Paper style={{ padding: 10 }}>
          <Typography gutterBottom paragraph>
            Pod ręką:
          </Typography>
          {this.state.show ? <div>{this.props.children}</div> : null}
          <Button
            variant="contained"
            color={this.state.show ? "primary" : "default"}
            onClick={() => this.setState({ show: !this.state.show })}
          >
            {this.state.show ? "Ukryj" : "Pokaż"}
          </Button>
        </Paper>
      </div>
    );
  }
}
