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
import AudioAnalyser from "./AudioAnalyser.js"


class Classrooms extends Component {
  constructor() {
    super();
    this.state = {
      classroomname: "",
      score: 0,
      counter: 0,
      cupcake: 0,
      animalboxes: [null, null, null, null, null, null, null, null, null, null],
      threshold: "175",
      audio: null
    };
  }

  componentDidMount = () => {
    this.setState(currentState => ({
      animalboxes: currentState.animalboxes.map(() => {
        return Math.floor(Math.random() * (6)) + 1
      })
    }))
    // const microphone = navigator.mediaDevices.getUserMedia({
    //   audio: true,
    //   video: false
    // });
    // }), () => {this.AudioContext = new window.AudioContext()
    //   this.analyser = this.AudioContext.createAnalyser()
    //   this.microphone = this.AudioContext.createMediaStreamSource(this.state.microphone)
    //   this.microphone.connect(this.analyser)
    // this.count = setInterval(() => this.checkvolume(), 2000)
  }


  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }


  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  startGame = (e) => {
    e.preventDefault()
    if (this.state.classroomname) {
      this.getMicrophone()
    }
    var settimer = setInterval(this.gainPoints, 2000)
  }

  toggleMicrophone = () => {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  classOver = () => {
    if (this.state.score) {
      this.state.audio.getTracks().forEach(track => track.stop());
      this.setState({
        audio: null
      })
      const endpoint = "https://noise-controller.herokuapp.com/api/classrooms"
      const gamesession = {
        classroom_name: this.state.classroomname,
        score: this.state.score
      }
      axios.post(endpoint, gamesession)
        .then(res => {
          console.log("LOGIN RESPONSE", res);
          window.setTimeout(() => { this.props.history.push("/classrooms") }, 5000);
        })
        .catch(error => {
          console.error("LOGIN ERROR", error);
        });
    }

  }

  gainPoints = () => {
    if (this.state.counter !== 10) {
      this.setState(currentState => ({
        counter: currentState.counter + 1,
        score: currentState.score + 20
      }))
    }
    else if (this.state.cupcake === 5) {
      return
    }
    else {
      this.setState(currentState => ({
        counter: 0,
        cupcake: currentState.cupcake + 1,
        animalboxes: currentState.animalboxes.map(() => {
          return Math.floor(Math.random() * (6)) + 1
        })
      }))
      if (this.state.cupcake === 5) {
        this.setState(currentState => ({
          score: currentState.score + 300
        }))
      }
      else if (this.state.cupcake === 4) {
        this.setState(currentState => ({
          score: currentState.score + 250
        }))
      }
      else if (this.state.cupcake === 3) {
        this.setState(currentState => ({
          score: currentState.score + 250
        }))
      }
      else if (this.state.cupcake === 2) {
        this.setState(currentState => ({
          score: currentState.score + 150
        }))
      }
      else if (this.state.cupcake === 1) {
        this.setState(currentState => ({
          score: currentState.score + 50
        }))
      }
    }
  }

  conditionalRender = () => {
    if (this.state.score) {
      return <div className="ClassFormContainer"><p className="display-3">Game Over! You were too loud!</p></div>
    }
    else {
      return <div className="ClassFormContainer">
        <Form className="ClassForm" onSubmit={this.startGame}>
          <FormGroup>
            <Label for="Classroom">New Classroom Name</Label>
            <Input className="ClassRoomInput" type="text" id="classroomname" value={this.state.classroomname} onChange={this.handleInputChange} />
            <div className="ThreshholdButtons">
              <p>Microphone Threshhold</p>
              <div>
                <input className="thresholdSelector" type="radio" id="threshold" name="threshold" value="125" onChange={this.handleInputChange} checked={this.state.threshold === "125"} />
                <label for="either">125</label>
              </div>
              <div>
                <input className="thresholdSelector" type="radio" id="threshold" name="threshold" value="150" onChange={this.handleInputChange} checked={this.state.threshold === "150"} />
                <label for="mailer">150</label>
              </div>
              <div>
                <input className="thresholdSelector" type="radio" id="threshold" name="threshold" value="175" onChange={this.handleInputChange} checked={this.state.threshold === "175"} />
                <label for="shipper">175</label>
              </div>
              <div>
                <input className="thresholdSelector" type="radio" id="threshold" name="threshold" value="200" onChange={this.handleInputChange} checked={this.state.threshold === "200"} />
                <label for="either">200</label>
              </div>
              <div>
                <input className="thresholdSelector" type="radio" id="threshold" name="threshold" value="225" onChange={this.handleInputChange} checked={this.state.threshold === "225"} />
                <label for="either">225</label>
              </div>
            </div>
          </FormGroup>
        </Form>
      </div>
    }
  }


  render() {
    const renderAnimals = () => {
      const returnimg = (img) => {
        switch (img) {
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
        let animalimg = returnimg(this.state.animalboxes[i - 1])
        animalboxarray.push(<div className="AnimalBox">{this.state.counter >= i && (<img className="AnimalImage" src={animalimg}></img>)}</div>)
      }
      return animalboxarray
    }
    return (
      <div className="MainWrapper">
        {this.state.audio ?
          (<div className="GameWrapper">
            <div className="GameLeft">
              <p className="ScoreDisplay display-4">You have {this.state.score} Points!</p>
              <div className="AnimalsWrapper">
                {renderAnimals()}
              </div>
              <Button className="EndButton" size="lg" onClick={this.classOver}><i class="far fa-bell"> </i> Class Over <i class="far fa-bell"> </i> </Button>
              {/* <Button onClick={this.toggleMicrophone}>
              {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
            </Button> */}
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
            {this.state.score && <AudioAnalyser
              audio={this.state.audio}
              classOver={this.classOver}
              threshold={this.state.threshold}
            />}
          </div>)
          :
          (this.conditionalRender())
        }
      </div>
    );
  }
}

export default axiosWithAuth(Classrooms);
