import React, { Component } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Jumbotron } from 'reactstrap';
import { NavLink, Link, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      username: "",
      password: ""
    };
  }
 
  handleLogin = event => {
    event.preventDefault();

    const endpoint = "https://noise-controller.herokuapp.com/api/auth/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log("LOGIN RESPONSE", res);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/classrooms");
      })
      .catch(error => {
        console.error("LOGIN ERROR", error);
      });
  };

  handleInputChange = event => {
    const { id, value } = event.target;

    this.setState({ [id]: value });
  };

  render() {
    return (
      <div>
      <Jumbotron>
        <h1 className="my-2 display-4">Classroom Noise Controller</h1>
        <p className="lead">A game to influence young students to quiet down!</p>
        <hr className="my-2" />
        <p>Make a teacher account and create classroom sessions of games, and then your students may view high scores on the scoreboard.</p>
      </Jumbotron>
      {!localStorage.getItem("jwt") ? (<div><form onSubmit={this.handleLogin}>
            <p className="LoginTitle">Teacher Login</p>
            <Form className="LoginForm" onSubmit={this.handleLogin}>
              <FormGroup>
                <Label for="Username">Username</Label>
                <Input className="LoginInput" type="text" id="username" value={this.state.username} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Password</Label>
                <Input className="LoginInput" type="password" id="password" value={this.state.password} onChange={this.handleInputChange} />
              </FormGroup>
              <Button>LOG IN</Button>
            </Form>
          </form>
          <div className="RegisterDiv">
            <p className="RegisterOr">or</p>
            <Link to="/signup"><Button>Create an Account</Button></Link>
          </div></div>) :
          (<div><p className="LoginTitle RegisterOr">You are already Logged In!</p>
          <Link to="/main">Click here to start a microphone game</Link></div>
          )}
          
      </div>
    );
  }
}

export default Login;
