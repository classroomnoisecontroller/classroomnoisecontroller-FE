import React, { Component } from "react";
import axiosWithAuth from "./utils/axiosWithAuth.js";
import axios from "axios";
import { NavLink, Link, withRouter } from "react-router-dom";

class Classrooms extends Component {
  constructor() {
    super();
    this.state = {
      classrooms: []
    };
  }

  componentDidMount() {
    console.log("hihihi");

    axios
      .get("https://noise-controller.herokuapp.com/api/classrooms")
      .then(res => {
        this.setState({ classrooms: res.data });
        console.log("res", res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.classrooms.length)
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    return (
      <div>
        <div />
        <div>
          {this.state.classrooms.map(classroom => (
            <div key={classroom.id}>
              <h2>{classroom.classroom_name}</h2>
              <h3>{classroom.teacher}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default axiosWithAuth(Classrooms);
