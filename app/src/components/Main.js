import React, { Component } from "react";
import axiosWithAuth from "./utils/axiosWithAuth.js";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Jumbotron } from 'reactstrap';

class Classrooms extends Component {
  constructor() {
    super();
    this.state = {
      classroomname: "",
      score: 100
    };
  }

  render() {
    return (
      <div className="GameWrapper">
        {this.state.classroomname ?
          (<div></div>)
          :
          (<div className="ClassFormContainer">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">New Classroom Name</Label>
                <Input className="LoginInput" type="text" id="username" value={this.state.username} onChange={this.handleInputChange} />
              </FormGroup>
            </Form>
          </div>)
        }
      </div>
    );
  }
}

export default axiosWithAuth(Classrooms);
