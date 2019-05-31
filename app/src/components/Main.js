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
      score: 0,
      counter: 0,
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
            <div className="GameLeft">
              <p className="ScoreDisplay display-4">You have {this.state.score} Points!</p>
            <div className="AnimalsWrapper">
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            <div className="AnimalBox"> </div>
            </div>
              <Button className="EndButton" size="lg"><i class="far fa-bell"> </i> Class Over <i class="far fa-bell"> </i> </Button>
            </div>
            <div className="GameRight">
              <p className="CupcakeTitle">Cupcakes</p>
              <div className="Cupcake"> </div>
              <p>5 points</p>
              <div className="Cupcake"> </div>
              <p>15 points</p>
              <div className="Cupcake"> </div>
              <p>25 points</p>
              <div className="Cupcake"> </div>
              <p>25 points</p>
              <div className="Cupcake"> </div>
              <p>30 points</p>
            </div>
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
