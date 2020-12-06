import React from "react";
import Header from "./Header";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import * as actions from "../actions";
class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}
export default connect(null, actions)(App);
