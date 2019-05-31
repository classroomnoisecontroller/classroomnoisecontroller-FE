import React, { Component } from "react";
import axiosWithAuth from "./utils/axiosWithAuth.js";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Jumbotron } from 'reactstrap';

class Classrooms extends Component {
  constructor() {
    super();
    this.state = {
      gamestarted: false,
      classroomname: "",
      score: 0
    };
  }

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  startGame = (e) => {
    e.preventDefault()
    if (this.state.classroomname) {
      this.setState({
        gamestarted: true
      })
    }
  }



  render() {
    return (
      <div className="MainWrapper">
        {this.state.gamestarted ?
          (<div className="GameWrapper">
          </div>)
          :
          (<div className="ClassFormContainer">
            <Form className="ClassForm" onSubmit={this.startGame}>
              <FormGroup>
                <Label for="Classroom">New Classroom Name</Label>
                <Input className="ClassRoomInput" type="text" id="classroomname" value={this.state.classroomname} onChange={this.handleInputChange} />
              </FormGroup>
            </Form>
          </div>)
        }
      </div>
    );
  }
}

export default axiosWithAuth(Classrooms);
