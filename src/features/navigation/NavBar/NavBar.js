import React from "react";

import { Card, Link, Box } from "@material-ui/core";

import classes from "./NavBar.module.scss";
import routes from "../routes";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Card className={classes.container}>
      {routes
        .filter((link) => !link.noNavBar)
        .map((link) => (
          <Box
            width="100%"
            height={50}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link to={link.path} exact={link.exact} component={NavLink}>
              {link.label}
            </Link>
          </Box>
        ))}
    </Card>
  );
}

export default NavBar;
