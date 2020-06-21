import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class FloorLink extends Component {
  render() {
    const { floor } = this.props;
    return (
      <div>
        <Grid key={floor.id} item xs={12} style={{ margin: 10 }}>
          <Paper style={{ padding: 15 }}>
            <Link to={`/floors/${floor.id}`}>{floor.name}</Link>
          </Paper>
        </Grid>
      </div>
    );
  }
}
