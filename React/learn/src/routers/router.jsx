import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "../pages";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    );
  }
}

export default Router;
