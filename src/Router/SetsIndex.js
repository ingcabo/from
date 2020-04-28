import React from "react";
import { Switch, Route } from "react-router-dom";

import Browse from "../routes/Browse";

// for routes under the media sets index
function SetsIndex() {
  return (
    <Switch>
      <Route
        path="/explore/sets"
        component={() => <Browse type="sets" />}
        exact
      />
    </Switch>
  );
}
export default SetsIndex;
