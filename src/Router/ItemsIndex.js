import React from "react";
import { Switch, Route } from "react-router-dom";

import MediaSets from "../routes/MediaSets";
import Browse from "../routes/Browse";
import Upload from "../routes/Upload";

// for routes under media items index
function ItemsIndex() {
  return (
    <Switch>
      <Route path="/upload" component={Upload} />
      <Route path="/explore/items" component={Browse} />
      <Route path="/create-sets" component={MediaSets} exact />
    </Switch>
  );
}

export default ItemsIndex;
