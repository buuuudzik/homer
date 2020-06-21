import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const styles = {
  menuButton: {
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
  },
};

const breadcrumbNameMap = (config, dest) => {
  const index = {
    "/floors": "Piętra",
    "/systems": "Systemy",
  };

  let label = index[dest];
  if (label) return label;
  else {
    const pathnames = dest.split("/").filter((n) => n !== "");
    switch (pathnames[0]) {
      case "floors": {
        const configKey = pathnames.length === 3 ? "rooms" : "floors";
        const id = pathnames[pathnames.length - 1];
        const el = config[configKey].find((el) => el.id === parseInt(id));
        return el ? el.name : id;
      }
      default:
        if (dest !== "/home") return "Nieznany";
        else return "";
    }
  }
};

class TopBar extends Component {
  getBreadcrumbs() {
    const { config } = this.props;
    let pathnames = this.props.location.pathname.split("/").filter((x) => x);

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={"/home"} style={{ color: "white" }}>
          Start
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          const label = breadcrumbNameMap(config, to);

          return label ? (
            last ? (
              <Typography color="initial" key={to}>
                {label}
              </Typography>
            ) : (
              <Link color="inherit" to={to} key={to}>
                {label}
              </Link>
            )
          ) : null;
        })}
      </Breadcrumbs>
    );
  }

  render() {
    return (
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
            {this.getBreadcrumbs()}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(TopBar);
