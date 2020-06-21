import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import RoomLink from "./RoomLink";

export default class RoomLinks extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid container style={{ minWidth: 275, margin: 10 }} spacing={2}>
          {this.props.rooms.map((r) => (
            <RoomLink key={r.id} room={r} />
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}
