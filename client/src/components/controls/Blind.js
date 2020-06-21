import React, { Component } from "react";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import localbus from "../../localbus";

const UP = false;
const DOWN = true;

export default class Blind extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionStatus: 0,
      motionStatus: false,
    };
  }

  onUpDown = (cmd) => {
    const { objects } = this.props.config;
    localbus.write(objects.upDown, cmd);
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
    const { position, positionStatus } = config.objects;

    return (
      <div className="device blind-container">
        <div onClick={() => this.onUpDown(UP)} className="blind-updown">
          <ExpandMoreOutlinedIcon />
        </div>
        <div className="blind-position">{this.state.positionStatus}%</div>
        <div onClick={() => this.onUpDown(DOWN)} className="blind-updown">
          <ExpandLessOutlinedIcon />
        </div>
        <div
          className={
            "blind-name" +
            (this.state.motionStatus ? " blind-name--motion" : "")
          }
        >
          {config.name}
        </div>
      </div>
    );
  }
}
