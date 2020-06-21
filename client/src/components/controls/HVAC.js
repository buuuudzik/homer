import React, { Component } from "react";
import { Slider } from "@material-ui/core";
import localbus from "../../localbus";

const marks = [
  {
    value: 10,
    label: "10°C",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 22,
    label: "22",
  },
  {
    value: 35,
    label: "35°C",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

// gdy 0 i 100% to wysyłasz komendę up/down

export default class HVAC extends Component {
  constructor(props) {
    super(props);

    this.maxPage = 1;

    this.state = {
      temp: 0,
      setpStatus: 0,
      page: 0,
    };
  }

  onChangePage = (direction = true) => {
    this.setState((prevState) => {
      let nextPage = prevState.page;
      if (direction) {
        nextPage++;
        if (nextPage > this.maxPage) nextPage = 0;
      } else {
        nextPage--;
        if (nextPage < 0) nextPage = this.maxPage;
      }
      return { page: nextPage };
    });
  };

  changeSetp = (event, newValue) => {
    const { objects } = this.props.config;
    localbus.write(objects.setp, newValue);
  };

  componentDidMount() {
    const { objects } = this.props.config;
    localbus.listen("object", objects.temp, (v) => {
      this.setState({ temp: v });
    });
    localbus.listen("object", objects.setpStatus, (v) => {
      this.setState({ setpStatus: v });
    });
  }

  componentWillUnmount() {
    const { objects } = this.props.config;
    localbus.unlisten("object", objects.temp);
    localbus.unlisten("object", objects.setpStatus);
  }

  render() {
    const { config } = this.props;
    const { temp, setpStatus } = this.state;

    return (
      <div className="device hvac-container">
        <div className="device-group">
          <div>{`${valuetext(temp)} => ${valuetext(setpStatus)}`}</div>
          <div
            className={"device-name"}
            onClick={() => this.onChangePage(true)}
          >
            {config.name}
          </div>
        </div>
        {this.state.page === 0 ? (
          <React.Fragment>
            <div className="device-group">
              <div className="hvac-slider">
                <Slider
                  defaultValue={0}
                  value={this.state.setpStatus}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-custom"
                  step={1}
                  valueLabelDisplay="auto"
                  marks={marks}
                  onChange={this.changeSetp}
                  min={10}
                  max={35}
                />
              </div>
              <div>Tzadana</div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
