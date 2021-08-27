import React from "react";

import { Logo, Link, QueryForm } from "../components";

class Introduction extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="mx-4 fs-2 d-flex justify-content-evenly">
          <div className="card">
            <div className="card-body">
              <div className="card-text">Introduction...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-md-center justify-content-sm-center mt-3">
          <div className="col col-md-6 col-lg-6">
            <Logo />
          </div>
        </div>
        <div className="row justify-content-md-center justify-content-sm-center mt-3">
          <div className="col col-md-6 col-lg-6">
            <Link />
          </div>
        </div>
        <div className="row justify-content-md-center justify-content-sm-center mt-3">
          <div className="col col-md-6 col-lg-6">
            <Introduction />
          </div>
        </div>
        <div className="row justify-content-md-center justify-content-sm-center mt-5">
          <div className="col col-md-6 col-lg-6">
            <QueryForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
