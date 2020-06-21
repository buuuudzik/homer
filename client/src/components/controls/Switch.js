import React, { Component } from "react";
import localbus from "../../localbus";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default class SwitchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
    };
  }

  onChange = () => {
    const { objects } = this.props.config;
    localbus.write(objects.switch, !this.state.status);
  };

  // długie naciśnięcie na przycisk powoduje powtórzenie tej samej komendy

  componentDidMount() {
    const { objects } = this.props.config;
    localbus.listen("object", objects.status, (v) => {
      this.setState({ status: v });
    });
  }

  componentWillUnmount() {
    const { objects } = this.props.config;
    localbus.unlisten("object", objects.status);
  }

  render() {
    const { name } = this.props.config;

    return (
      <div className="device">
        <FormControlLabel
          control={
            <Switch
              checked={this.state.status}
              onChange={this.onChange}
              name={name}
              color={this.state.status ? "primary" : "secondary"}
            />
          }
          label={name}
        />
      </div>
    );
  }
}
