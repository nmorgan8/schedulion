import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import './NewGame.css'
import {Plus} from 'react-bootstrap-icons';

export default function NewGame(props) {
    return (
      <div className="NewGame">
      <Form>
  <Row>
    <Col>
    <FloatingLabel controlId="floatingSelect" label="Opponent">
  <Form.Select>
    <option>Select</option>
    <option value="1">Gonzaga</option>
    <option value="2">Pepperdine</option>
    <option value="3">USF</option>
  </Form.Select>
</FloatingLabel>
    </Col>
    <Col>
    <FloatingLabel label="Game Day">
      <Form.Control type="date" name="dob" placeholder="Date of Game" />
    </FloatingLabel>
    </Col>
    <Col>
    <FloatingLabel label="Notes">
    <Form.Control type="textarea" name="notes" placeholder="Notes" />
    </FloatingLabel>
    </Col>
    <Col xs={1}>
    <Button variant="primary" type="submit" ClassName="SubmitButton">
    Submit
  </Button>

    </Col>

  </Row>
</Form>
      </div>
    );
}

//
// class NewGame extends Component{
// state= {showForm: false}
//
// showForm = () => {
//    return (
//      <div>
//     <form id= "add-app">
//
//          <label>Application Name : </label>
//          <input type="text"> </input>
//
//          <label> id : </label>
//          <input type="text" ></input>
//
//          <label>Server details : </label>
//          <input ></input>
//
//          <button>Create</button>
//       </form>
//       </div>
//      );
//  }
//
// render(){
//     return (
//         <div className='manage-app'>
//         <h1>Manage Application</h1>
//         <button  onClick={() => this.setState({showForm: true}) }>Add New Application</button>
//         <button>Change Existing Application</button>
//         <button>Remove Application</button>
//         {this.state.showForm ? this.showForm() : null}
//         </div>
//     );
// }
//
// }
// export default NewGame
