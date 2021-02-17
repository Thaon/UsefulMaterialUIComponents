import React from "react";
import "../App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import { PrivateRoute } from "./PrivateRoute";

function AppRouter() {
  return (
    <Switch>
      <Route path="/login">
        <LoginScreen />
      </Route>
      <PrivateRoute path="/dashboard" Component={DashboardScreen} />
      <Route
        exact
        path={`/`}
        render={() => <Redirect to={`/dashboard/home`} />}
      />
    </Switch>
  );
}

export default AppRouter;
