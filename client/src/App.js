import React from 'react';
import './App.css';
import localbus from './localbus.js';
import config from './config';
import { CircularProgress } from '@material-ui/core';
import Switch from './components/controls/Switch';

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
    // localbus.listen('object', '0/0/1', function(value) {
    //   console.log("object", value);
    // });

    this.useConfig();
  }

  componentWillUnmount() {
    localbus.unlisten('object', '0/0/1');
  }

  useConfig = async () => {
    const res = await this.downloadConfig();
    config.setConfig(res);
    this.setState({ withConfig: true });
  }

  downloadConfig = async () => {
    const res = await fetch("/config.json");
    const obj = await res.json();
    
    if (res.status === 200) {
      this.setState({ loading: false });
      return obj;
    }

    this.setState({ loading: false, hasError: true });
    return null;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.state.loading ? (
              <div>
                <CircularProgress />
                <div>Ładowanie konfiguracji</div>
              </div>
            ) : (
              this.state.withConfig ? (
                <Switch config={config.devices[0]}></Switch>
              ) : (
                <div>{"Nie udało się pobrać konfiguracji:("}</div>
              )
            )
          }
        </header>
      </div>
    );
  }
}

export default App;
