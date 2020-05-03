import React from "react";
import routes from "../routes";
import { Route, Switch } from "react-router-dom";

function Routes() {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}

export default Routes;
