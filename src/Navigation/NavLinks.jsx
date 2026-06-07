import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../shared/context/auth-context";
import Avatar from "../shared/components/UIElement/Avatar";
import { useHttpClient } from "../shared/hooks/http-hook";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState({});

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_AUTH_URI}/login/${auth.userId}`,
        );
        setLoadedPlaces(responseData.user);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, auth.userId]);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <div className="user-item__image" title={loadedPlaces?.username}>
            <Avatar
              image={loadedPlaces?.useravatar}
              alt={loadedPlaces?.username}
            />
          </div>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
