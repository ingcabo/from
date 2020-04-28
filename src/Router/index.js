import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect, Switch, Route } from "react-router-dom";
import { authorizeUser, logout } from "../actions";
import {
  MAIN_INDEX,
  MEDIA_INDEX,
  LOGS_INDEX,
  interceptAxiosResponse
} from "../utils";

import ItemsIndex from "./ItemsIndex";
import LogsIndex from "./LogsIndex";
import SetsIndex from "./SetsIndex";
import Header from "../components/Header";
import WrapWithSearchKitProvider from "../components/WrapWithSearchKitProvider.js";

class Router extends React.Component {
  componentDidMount() {
    this.props.authorizeUser();

    //global error handling for unauthorized requests.
    axios.interceptors.response.use(
      ...interceptAxiosResponse(this.props.logout)
    );
  }

  render() {
    const { authorized, loggedOut, expired, location, logout } = this.props,
      { pathname } = location;

    if (expired || loggedOut || authorized === false) {
      return (
        <Redirect
          to={`/signin${
            pathname !== "/" && !loggedOut ? `?redirect=${pathname}` : ""
          }`}
        />
      );
    }

    if (authorized) {
      return (
        <div className="main">
          <Header logout={logout} />
          <Switch>
            {/*For the media sets index*/}
            <Route
              path="/explore/sets"
              component={() => (
                <WrapWithSearchKitProvider
                  Component={SetsIndex}
                  baseUrl={`${MEDIA_INDEX}`}
                  logout={logout}
                />
              )}
            />
            {/*For the logs index*/}
            <Route
              path="/logs"
              component={() => (
                <WrapWithSearchKitProvider
                  Component={LogsIndex}
                  baseUrl={`${LOGS_INDEX}`}
                  logout={logout}
                />
              )}
            />
            {/*For the media items index*/}
            <Route
              path="/"
              component={() => (
                <WrapWithSearchKitProvider
                  Component={ItemsIndex}
                  baseUrl={`${MAIN_INDEX}`}
                  logout={logout}
                />
              )}
            />
          </Switch>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  const { user } = state,
    { authorized, userObj, expired, loggedOut } = user;
  return {
    authorized,
    loggedOut,
    expired,
    userObj
  };
};

export default connect(
  mapStateToProps,
  { authorizeUser, logout }
)(Router);
