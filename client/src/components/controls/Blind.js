import React, { Component } from "react";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import { Slider, Typography } from "@material-ui/core";
import localbus from "../../localbus";

const UP = false;
const DOWN = true;

const marks = [
  {
    value: 0,
    label: "OTW",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 70,
    label: "70%",
  },
  {
    value: 100,
    label: "ZAM",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

// gdy 0 i 100% to wysyłasz komendę up/down

export default class Blind extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionStatus: 0,
      motionStatus: false,
      editingPosition: false,
    };
  }

  onUpDown = (cmd) => {
    const { objects } = this.props.config;
    localbus.write(objects.upDown, cmd);
  };

  onToggleMenu = () => {
    this.setState((prevState) => ({
      editingPosition: !prevState.editingPosition,
    }));
  };

  changePosition = (event, newValue) => {
    const { objects } = this.props.config;
    if (newValue === 0 || newValue === 100) {
      localbus.write(objects.upDown, newValue === 0);
    } else {
      localbus.write(objects.position, newValue);
    }
  };

  componentDidMount() {
    const { objects } = this.props.config;
    localbus.listen("object", objects.positionStatus, (v) => {
      this.setState({ positionStatus: v });
    });
    if (objects.motionStatus) {
      localbus.listen("object", objects.motionStatus, (v) => {
        this.setState({ motionStatus: v });
      });
    }
  }

  componentWillUnmount() {
    const { objects } = this.props.config;
    localbus.unlisten("object", objects.positionStatus);
    if (objects.motionStatus) {
      localbus.unlisten("object", objects.motionStatus);
    }
  }

  render() {
    const { config } = this.props;

    return (
      <div className="device blind-container">
        {this.state.editingPosition ? (
          <div className="blind-slider">
            <Slider
              defaultValue={0}
              value={this.state.positionStatus}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-custom"
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={this.changePosition}
            />
          </div>
        ) : (
          <React.Fragment>
            <div onClick={() => this.onUpDown(UP)} className="blind-updown">
              <ExpandMoreOutlinedIcon />
            </div>
            <div className="blind-position-status" onClick={this.onToggleMenu}>
              <div
                className="blind-position-background"
                style={{ height: `${this.state.positionStatus}%` }}
              ></div>
            </div>
            <div onClick={() => this.onUpDown(DOWN)} className="blind-updown">
              <ExpandLessOutlinedIcon />
            </div>
          </React.Fragment>
        )}
        <div
          className={
            "blind-name" +
            (this.state.motionStatus ? " blind-name--motion" : "")
          }
          onClick={this.onToggleMenu}
        >
          {config.name}
        </div>
      </div>
    );
  }
}
