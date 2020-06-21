import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

export default class Floors extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid container style={{ minWidth: 275, margin: 10 }} spacing={2}>
          {this.props.floors.map((f) => (
            <Grid key={f.id} item xs={2}>
              <Paper style={{ padding: 15 }}>{f.name}</Paper>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}
