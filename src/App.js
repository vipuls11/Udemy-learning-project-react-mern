import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./Navigation/MainNavigation.jsx";
import UserPlaces from "./places/pages/UserPlaces.jsx";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/new-place" exact>
            <NewPlace />
          </Route>
          {/* //To redirect the path when path is differnce it's redirect to this path */}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
