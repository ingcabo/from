import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { store } from "./store";

import Signin from "./routes/Signin";
import Router from "./Router";
import "./styles/styles.scss";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route path="/signin" exact component={Signin} />
          <Route path="/" component={Router} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
