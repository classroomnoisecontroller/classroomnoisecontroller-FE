import React, { Component } from "react";
import { Route, Switch, withRouter, NavLink } from "react-router-dom";
import { Nav, NavItem, Button } from "reactstrap"
import axios from "axios";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Main from "./components/Main.js"
import Classrooms from "./components/Classrooms.js";
import "./reset.css";
import "./App.css";

axios.defaults.baseURL =
  process.env.API_URL || "https://noise-controller.herokuapp.com/";

class App extends Component {
  logout = e => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <header>
          <Nav className="MainNav">
            {localStorage.getItem("jwt") && (<NavItem><Button type="button" onClick={this.logout}>
              Logout
          </Button></NavItem>)}
            {localStorage.getItem("jwt") ? (<NavItem>
              <NavLink to="/main"><Button>Start Quiet Game</Button></NavLink>
            </NavItem>) : (<NavItem>
              <p>Start Quiet Game</p>
            </NavItem>)}
            {localStorage.getItem("jwt") ? (<NavItem>
              <NavLink to="/classrooms"><Button>Scoreboard</Button></NavLink>
            </NavItem>) : (<NavItem>
              <p>Scoreboard</p>
            </NavItem>)}
          </Nav>
        </header>
        <Switch>
          <Route path="/signup" render={props => <Signup {...props} />} />
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route path="/main" component={Main} />
          <Route path="/classrooms" component={Classrooms} />
        </Switch>
        <div className="Footer">
          <p className="TestAccount">Test Account | Login: test | Password: password</p>
          <p>Favicon Provided by Shannon E Thomas at https://www.toicon.com/icons/pictogram_use.</p>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
