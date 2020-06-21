import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Devices from "./Devices";
import { Typography } from "@material-ui/core";

class Room extends Component {
  render() {
    // Wyświetl szybkie i jego urządzenia w tym przedstaw temp itp. na wierzch
    const { config, match } = this.props;
    const roomId = parseInt(match.params.roomId);

    const room = config.getRoomById(roomId);

    const devices = config.devices.filter((d) => d.roomId === roomId);

    return (
      <div style={{ padding: 10 }}>
        <Typography color="initial" variant="h6" style={{ padding: "10 0" }}>
          {room.name}
        </Typography>
        <Devices devices={devices} />
      </div>
    );
  }
}

export default withRouter(Room);
