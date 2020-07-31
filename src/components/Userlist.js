import React, { Component } from "react";
import axios from "axios";
import ShowActivities from "./ShowActivities";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      startTime: [],
      endTime: [],
      activities: [],
      modalShow: false,
      userIndex: 0,
    };
  }
  componentDidMount() {
    axios
      .get("https://9e61af29-492f-4f2d-9372-0d73079accdd.mock.pstmn.io//user/")
      .then((response) => {
        this.setState({
          data: response.data.members.map((member) => member),
          activities: response.data.members.map(
            (member) => member.activity_periods
          ),
          startTime: response.data.members.map((member) =>
            member.activity_periods.map((time) => time.start_time)
          ),
          endTime: response.data.members.map((member) =>
            member.activity_periods.map((time) => time.end_time)
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userListStartTime() {
    return this.state.endTime.map((time) => (
      <tr>
        <td>{time}</td>
      </tr>
    ));
  }
  userListEndTime() {
    return this.state.startTime.map((time) => (
      <tr>
        <td>{time}</td>
      </tr>
    ));
  }

  userList() {
    return this.state.data.map((data, index) => (
      <tr>
        <td> {data.id}</td>
        <td>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ modalShow: true, userIndex: index });
            }}
          >
            {data.real_name}
          </a>
        </td>
        <td> {data.tz}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        <h1>Users List</h1>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User Id</th>
              <th>Username</th>
              <th>Address </th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
        <ShowActivities
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          startTime={this.userListStartTime()}
          endTime={this.userListEndTime()}
          index={this.state.userIndex}
        />
      </div>
    );
  }
}
