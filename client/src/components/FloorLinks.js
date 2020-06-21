import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import FloorLink from "./FloorLink";

export default class Floors extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid container style={{ minWidth: 275, margin: 10 }} spacing={2}>
          {this.props.floors.map((f) => (
            <FloorLink key={f.id} floor={f} />
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}
