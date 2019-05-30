import React, { Component } from "react";
import axiosWithAuth from "./utils/axiosWithAuth.js";
import axios from "axios";
import { NavLink, Link, withRouter } from "react-router-dom";
import { Table } from 'reactstrap';

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
        <p className="LoginTitle">Past Games Played</p>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Classroom Name</th>
                <th>Teacher</th>
                <th>Final Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.classrooms.length && (
                this.state.classrooms.map(({ id, date, classroom_name, teacher, score }) => (
                  <tr key={id}>
                    <td>{date}</td>
                    <td>{classroom_name}</td>
                    <td>{teacher}</td>
                    <td>{score}</td>
                  </tr>
                )))
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default axiosWithAuth(Classrooms);
