import React, { Component } from "react";
import axiosWithAuth from "./utils/axiosWithAuth.js";
import axios from "axios";
import { NavLink, Link, withRouter } from "react-router-dom";
import { Table, Button } from 'reactstrap';
import moment from "moment";

class Classrooms extends Component {
  constructor() {
    super();
    this.state = {
      classrooms: [],
      page: 1
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

  nextpage = () => {
    this.setState(currentState => ({
      page: currentState.page + 1
    }))
    console.log("working next")
  }

  prevpage = () => {
    this.setState(currentState => ({
      page: currentState.page - 1
    }))
  }



  render() {
    const pagestart = (this.state.page - 1) * 10
    const pageend = pagestart + 10
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
          <div className="TableTitleAndPages">
            {this.state.page === 1 ?
              (<Button className="Hidden">Prev Page</Button>)
              :
              (<Button onClick={() => this.prevpage()} className="PrevPage">Prev Page</Button>)
              }
            <p className="TableTitle">Past Games Played</p>
            {(this.state.classrooms.length > this.state.page * 10) ?
              (<Button onClick={() => this.nextpage()} className="NextPage">Next Page</Button>)
              :
              (<Button className="Hidden">Next Page</Button>)}
          </div>
          <p className="PageNumber">Page {this.state.page}</p>
          <Table striped>
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
                this.state.classrooms.slice(pagestart, pageend).map(({ id, date, classroom_name, teacher, score }) => (
                  <tr key={id}>
                    <td>{moment(date).format('MM/DD/YYYY hh:mm:ss a')}</td>
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
