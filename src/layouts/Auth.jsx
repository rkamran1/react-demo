import React, { Component } from 'react';
import AuthRoutes from "authRoutes.js";
import {Route, Switch} from "react-router-dom";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.mainPanel = React.createRef();
  }
  render() {
    return (
        <div className="wrapper wrapper-full-page">
          <div className="main-panel" ref={this.mainPanel}>
            <Switch>
              {AuthRoutes.map((prop, key) => {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
              })}
            </Switch>
          </div>
        </div>
    )
  }
}
