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
import Auth from "./user/pages/Auth.jsx";
import {AuthContext} from './shared/context/auth-context.js'
import { useAuth } from "./shared/hooks/auth-hook.js";
import UpdatePlace from "./places/pages/UpdatePlace.jsx";

function App() {
  const {token, login, logout, userId} = useAuth() 
  // console.log(token,"user",userId)
  let routes;
  if(token){
    routes=(
        <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }else{
    routes =(
     <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/place" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider 
    value={{
      isLoggedIn : !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}
    >

   
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
     </AuthContext.Provider>
  );
}

export default App;
