import React, { Component } from "react";
import Switch from "./controls/Switch";
import FloorLinks from "./FloorLinks";
import Fast from "./Fast";

export default class Homepage extends Component {
  render() {
    const { config } = this.props;
    return (
      <div>
        <Fast>
          <Switch config={config.devices[0]}></Switch>
          <Switch config={config.devices[1]}></Switch>
        </Fast>
        <FloorLinks floors={config.floors} config={config} />
      </div>
    );
  }
}
