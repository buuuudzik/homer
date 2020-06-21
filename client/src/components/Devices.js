import React, { Component } from "react";
import Switch from "./controls/Switch";
import Blind from "./controls/Blind";
import HVAC from "./controls/HVAC";

// Ten komponent musi wiedzieć
// Dzielenie na typy urządzeń
export default class Devices extends Component {
  render() {
    return (
      <div className="devices">
        {this.props.devices.map((d) => {
          switch (d.type) {
            case "switch":
              return <Switch key={d.id} config={d} />;
            case "blind":
              return <Blind key={d.id} config={d} />;
            case "hvac":
              return <HVAC key={d.id} config={d} />;
            default:
              return (
                <div key={d.id}>{`Nieobsługiwane urządzenie: ${d.type}`}</div>
              );
          }
        })}
      </div>
    );
  }
}
