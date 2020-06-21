import React, { Component } from "react";
import FloorLinks from "./FloorLinks";
import Fast from "./Fast";
import Devices from "./Devices";

export default class Homepage extends Component {
  render() {
    const { config } = this.props;
    return (
      <div style={{ padding: 10 }}>
        <Fast>
          <Devices devices={[config.devices[0], config.devices[1]]} />
        </Fast>
        <FloorLinks floors={config.floors} config={config} />
      </div>
    );
  }
}
