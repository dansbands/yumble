import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      fields: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
      }
    }
  }

  handleChange = e => {
    const newFields = {
      ...this.state.fields,
      [e.target.name]: e.target.value
    }
    this.setState({ fields: newFields })
  }

  handleSubmit = e => {
    e.preventDefault()
    // console.log('submit SignUp');
    api.auth.signUp(this.state.fields)

    .then( data => {
      console.log('the response is', data);
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.props.handleLogin(data);
        this.props.history.push('/friends')
      }
    });
  }

  render() {
    return (
      <div className="background">
        <div className="supporting-content center-block signin">
          {this.state.error ? <h1>Try Again</h1> : null}
          <h3>Sign Up</h3>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              className="form-control"
              name="firstname"
              placeholder="First Name"
              value={this.state.fields.firstname}
              onChange={e => this.handleChange(e)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="form-control"
              name="lastname"
              placeholder="Last Name"
              value={this.state.fields.lastname}
              onChange={e => this.handleChange(e)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              name="username"
              placeholder="Username"
              value={this.state.fields.username}
              onChange={e => this.handleChange(e)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.fields.password}
              onChange={e => this.handleChange(e)}></input>
          </div>


          <Link
            to="/settings"
            onClick={this.handleSubmit}>
            <input className="btn btn-default" type="submit"></input>
          </Link>
          <br></br>
          <Link
            to="/signin"
            className="pull-right">
            Already a user? Sign In instead.
          </Link>
        </div>
      </div>

    )
  }
}

export default SignUp;
