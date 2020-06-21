import React from "react";
import "./App.css";
import config from "./config";
import {
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Button,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Homepage from "./components/Homepage";

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
      },
      menuButton: {
        marginRight: 10,
      },
      title: {
        flexGrow: 1,
      },
    };

    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              style={styles.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={styles.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {this.state.loading ? (
          <div>
            <CircularProgress />
            <div>Ładowanie konfiguracji</div>
          </div>
        ) : this.state.withConfig ? (
          <Homepage config={config} />
        ) : (
          <div>{"Nie udało się pobrać konfiguracji:("}</div>
        )}
      </div>
    );
  }
}

export default App;
