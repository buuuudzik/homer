import React, { Component } from "react";
import Switch from "./controls/Switch";
import Floors from "./Floors";

export default class Homepage extends Component {
  render() {
    const { config } = this.props;
    return (
      <div>
        <Floors floors={config.floors} config={config} />
        <Switch config={config.devices[0]}></Switch>
      </div>
    );
  }
}
