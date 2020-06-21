import React, { Component } from "react";
import FloorLinks from "./FloorLinks";

export default class Floors extends Component {
  render() {
    const { config } = this.props;

    return (
      <div style={{ padding: 10 }}>
        <FloorLinks floors={config.floors} config={config} />
      </div>
    );
  }
}
