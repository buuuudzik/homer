import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomLink extends Component {
  render() {
    const { room } = this.props;
    return (
      <div>
        <Grid key={room.floorId} item xs={12} style={{ margin: 10 }}>
          <Paper style={{ padding: 15 }}>
            <Link to={`/floors/${room.floorId}/${room.id}`}>{room.name}</Link>
          </Paper>
        </Grid>
      </div>
    );
  }
}
