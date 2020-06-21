import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RoomLinks from "./RoomLinks";

class Floor extends Component {
  render() {
    const { config, match } = this.props;
    const floorId = parseInt(match.params.floorId);

    const rooms = config.rooms.filter((r) => r.floorId === parseInt(floorId));

    return (
      <div style={{ padding: 10 }}>
        <RoomLinks rooms={rooms} />
      </div>
    );
  }
}

export default withRouter(Floor);
