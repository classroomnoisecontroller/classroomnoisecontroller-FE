import React, { Component } from "react";
import axiosWithAuth from "./utils/axiosWithAuth.js";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Jumbotron } from 'reactstrap';
import img1 from "../images/1.jpg"
import img2 from "../images/2.jpg"
import img3 from "../images/3.jpg"
import img4 from "../images/4.jpg"
import img5 from "../images/5.jpg"
import img6 from "../images/6.jpg"
import green from "../images/green.jpg"
import pink from "../images/pink.jpg"
import yellow from "../images/yellow.jpg"
import red from "../images/red.jpg"
import purple from "../images/purple.jpg"

class Classrooms extends Component {
  constructor() {
    super();
    this.state = {
      gamestarted: false,
      classroomname: "",
      score: 0,
      counter: 0,
      cupcake: 0,
      animalboxes: [null, null, null, null, null, null, null, null, null, null]
    };
  }

  componentDidMount() {
    this.setState(currentState => ({
      animalboxes: currentState.animalboxes.map(() => {
        return Math.floor(Math.random() * (6)) + 1
      })
    }))
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
    window.setInterval(this.gainPoints, 2000)
  }

  gainPoints = () => {
    if (this.state.counter !== 10) {
      this.setState(currentState => ({
        counter: currentState.counter + 1
      }))
    }
  }


  render() {
    const renderAnimals = () => {
      const returnimg = (img) => {
      switch(img) {
        case 1:
          return img1
        case 2:
          return img2
        case 3:
          return img3
        case 4:
          return img4
        case 5:
          return img5
        case 6:
          return img6
      }
    }
      const animalboxarray = []
      for (let i = 1; i <= 10; i++) {
        let animalimg = returnimg(this.state.animalboxes[i-1])
        animalboxarray.push(<div className="AnimalBox">{this.state.counter >= i && (<img className="AnimalImage" src={animalimg}></img>)}</div>)
      }
      return animalboxarray
    }
    return (
      <div className="MainWrapper">
        {this.state.gamestarted ?
          (<div className="GameWrapper">
            <div className="GameLeft">
              <p className="ScoreDisplay display-4">You have {this.state.score} Points!</p>
              <div className="AnimalsWrapper">
              {renderAnimals()}
              </div>
            <Button className="EndButton" size="lg"><i class="far fa-bell"> </i> Class Over <i class="far fa-bell"> </i> </Button>
          </div>
            <div className="GameRight">
              <p className="CupcakeTitle">Cupcakes</p>
              <div className="Cupcake">{this.state.cupcake >= 1 &&
              (<img src={green} />)} 
              </div>
              <p>50 points</p>
              <div className="Cupcake">{this.state.cupcake >= 2 &&
              (<img src={pink} />)} </div>
              <p>150 points</p>
              <div className="Cupcake">{this.state.cupcake >= 3 &&
              (<img src={yellow} />)} </div>
              <p>250 points</p>
              <div className="Cupcake">{this.state.cupcake >= 4 &&
              (<img src={red} />)} </div>
              <p>250 points</p>
              <div className="Cupcake">{this.state.cupcake >= 5 &&
              (<img src={purple} />)} </div>
              <p>300 points</p>
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
