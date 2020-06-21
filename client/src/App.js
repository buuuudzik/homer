import React from "react";
import "./App.css";
import config from "./config";
import { CircularProgress } from "@material-ui/core";
import Homepage from "./components/Homepage";
import Floors from "./components/Floors";
import Room from "./components/Room";
import Systems from "./components/Systems";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopBar from "./components/TopBar.js";
import Floor from "./components/Floor.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      hasError: false,
      localbusOpened: false,
      withConfig: false,
    };
  }

  componentDidMount() {
    this.useConfig();
  }

  useConfig = async () => {
    const res = await this.downloadConfig();
    config.setConfig(res);
    this.setState({ withConfig: true });
  };

  downloadConfig = async () => {
    const res = await fetch("/config.json");
    const obj = await res.json();

    if (res.status === 200) {
      this.setState({ loading: false });
      return obj;
    }

    this.setState({ loading: false, hasError: true });
    return null;
  };

  render() {
    const styles = {
      root: {
        flexGrow: 1,
        width: "100vw",
        overflowX: "hidden",
      },
    };

    return (
      <Router>
        <div style={styles.root}>
          <TopBar config={config} />
          {this.state.loading ? (
            <div>
              <CircularProgress />
              <div>Ładowanie konfiguracji</div>
            </div>
          ) : this.state.withConfig ? (
            <Switch>
              <Route path="/floors/:floorId/:roomId" exact>
                <Room config={config} />
              </Route>
              <Route path="/floors/:floorId" exact>
                <Floor config={config} />
              </Route>
              <Route path="/floors">
                <Floors config={config} />
              </Route>
              <Route path="/systems">
                <Systems config={config} />
              </Route>
              <Route path="/">
                <Homepage config={config} />
              </Route>
            </Switch>
          ) : (
            <div>{"Nie udało się pobrać konfiguracji:("}</div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
