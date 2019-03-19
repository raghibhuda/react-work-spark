/**
 *
 * Login
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post('http://127.0.0.1:8000/api/login', data)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.success.token);
        this.props.history.push('/tasks');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Your mail"
              onChange={this.handleEmailChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Your password"
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <Button onClick={this.handleLoginFormSubmit}>Login</Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;