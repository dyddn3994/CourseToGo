
import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Login from  './pages/LoginPage/LoginPage.js';
import MainPage from './pages/MainPage/MainPage.js';
function Routes() {
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  return (
    <div>
      {!isAuthorized ? <Redirect to="/" /> : <Redirect to="/main" />}
      <Switch>
        <Route path="/">
          <Login />
        </Route>

        <Route path="/main">
          <MainPage  />
        </Route>
      </Switch>
    </div>
  );
}
export default Routes;