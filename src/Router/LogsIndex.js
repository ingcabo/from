import React from "react";
import { Switch, Route } from "react-router-dom";

import Logs from "../routes/Logs";

// for routes under the media sets index
function LogsIndex() {
  return (
    <Switch>
      <Route path="/logs" component={Logs} exact />
    </Switch>
  );
}
export default LogsIndex;
