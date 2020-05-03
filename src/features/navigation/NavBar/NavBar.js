import React from "react";

import { Card, Link } from "@material-ui/core";

import classes from "./NavBar.module.scss";
import routes from "../routes";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Card className={classes.container}>
      {routes.map((link) => (
        <Link to={link.path} component={NavLink}>
          {link.label}
        </Link>
      ))}
    </Card>
  );
}

export default NavBar;
