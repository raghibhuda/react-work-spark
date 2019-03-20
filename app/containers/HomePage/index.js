/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>React App</h1>
        <Button className="btn btn-primary">
          <Link to="/login">Login</Link>
        </Button>
        <Button className="btn btn-success">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    );
  }
}