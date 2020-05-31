import React, { Component } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import sefia from './Images/sefia.jpg'

class Book extends Component {
  state = {
    name: '',
    subject: '',
    location: '',
    userFrom: '',
    userTo: '',
    value: []
 }

 componentDidMount() {
  axios.get('http://localhost:6660/meeting/')
  .then(res => this.setState({value: res.data.data}))
  .catch(error => {
    console.log(error)
   })
 }

changeHandler = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

submitHandler = (e) => {
  e.preventDefault()
  console.log(this.state)
  axios.post('https://meeting-b.herokuapp.com/meeting/createMeeting', this.state)
  .then(response => {
    axios.get('https://meeting-b.herokuapp.com/meeting')
      .then(res => this.setState({value: res.data.data}))
      .catch(error => {
        console.log(error)
       })
  })
  .catch(error => {
    console.log(error)
   })
}

    render(){
      const {name, subject, location, userFrom, userTo, value} = this.state
    return (
        <div className="flex-container-overall">
            <div className='Row'>
                <div className='flex-container' id='profile'>
                    <Row><img src={sefia} alt="sefia" /></Row>   
                    <Row><h3 className='under1'>Joanne</h3></Row>
                    <Row><h6 className='under2'>Upcoming meetings</h6></Row>
                    <Row>
                      <div className='output scrollbar'>
                      {value.length !== 0 ? (
                        value.map(v => (
                        <p className='space1' key={v._id}>
                        {`${v.name} \n ${v.subject} \n ${v.location} \n ${v.userFrom} \n ${v.userTo}`}
                      </p>
                        ))
                      ) : null}
                      </div>
                    </Row>
                </div>
                <div className='Col md={8}' id='sidebar'>
                  <div id='topsidebar'>
                    <Row><i className="far fa-clock fa-2x"></i></Row>   
                    <Row><h4>Set up a meeting</h4></Row>
                    <Row><h5>We'll email your colleagues and remind them</h5></Row>
                    <Row><h5>closer to the time</h5></Row>
                  </div>
                    <Form onSubmit={this.submitHandler} id='formpage'>
                    <Form.Group controlId='formBasicFullName' className='group topgroup'>
                    <Form.Label variant="secondary">To</Form.Label>
                      <Form.Control type='text' plaintext  placeholder='Joanne,John,Bob' size="sm" name='name' value={name} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='formBasicSubject' className='group topgroup'>
                    <Form.Label>Subject</Form.Label>
                      <Form.Control type='text' plaintext placeholder='Subject' size="sm" name='subject' value={subject} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='formBasicLocation' className='group topgroup'>
                    <Form.Label>Location</Form.Label>
                      <Form.Control type='text' plaintext placeholder='Location' size="sm" name='location' value={location} onChange={this.changeHandler}></Form.Control>
                    </Form.Group>
                    <Row>
                      <h6><strong>Duration</strong></h6>
                      <ButtonToolbar className='buttonToolbar'>
                        <Button variant="success">30 min</Button>
                        <Button variant="outline-dark">45 hour</Button>
                        <Button variant="outline-secondary">1 hour</Button>
                        <Button variant="outline-secondary">1.5 hour</Button>
                      </ButtonToolbar>    
                      <ButtonToolbar className='buttonToolbar'>
                        <Button variant="outline-secondary">2 hour</Button>
                        <Button variant="outline-dark">2.5 hour</Button>
                        <Button variant="outline-secondary">3 hour</Button>
                        <Button variant="outline-secondary">3.5 hour</Button>
                      </ButtonToolbar>
                      <ButtonToolbar className='buttonToolbar'>
                        <Button variant="outline-secondary">4  hour</Button>
                        <Button variant="outline-secondary">4.5 hour</Button>
                        <Button variant="outline-secondary">5 hour</Button>
                        <Button variant="outline-secondary">All days</Button>
                      </ButtonToolbar>
                    </Row>
                    <Row>
                    <h6>Time</h6>
                    </Row>
                    <Row>
                    <Col className='group bottomgroup'>
                    <InputGroup>
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupPrepend"><i className="fa fa-lock fa-0.02x"></i></InputGroup.Text>
                        </InputGroup.Append>
                    <Form.Control type='text' plaintext placeholder='From' name='userFrom' value={userFrom} onChange={this.changeHandler} />
                    </InputGroup>
                      </Col> 
                      <Col className='group bottomgroup'>
                        <InputGroup>
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupPrepend"><i className="fa fa-lock fa-0.02x"></i></InputGroup.Text>
                        </InputGroup.Append>
                      <Form.Control type='text' plaintext placeholder='To' name='userTo' value={userTo} onChange={this.changeHandler} /> 
                      </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                        <Button type="submit" variant="danger" id='button' size="lg" block>Send<i id="greaterthan" className="fa fa-angle-right fa-2x"></i></Button>
                    </Row>
                    </Form>
                </div>
            </div>    
        </div>
    )
}
}

export default Book;
