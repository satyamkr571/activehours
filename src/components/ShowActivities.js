import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

export default class ShowActivities extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  showStartTime = () => {
    this.props.startTime.map((item) => <Col>{item}</Col>);
  };
  showEndTime = () => {
    this.props.userEndTime.map((item) => <Col>{item}</Col>);
  };
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              User Activities
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>{this.props.showStartTime}</Col>
              <Col>{this.props.endTime[0]}</Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
