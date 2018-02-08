import React from 'react';
import { Link } from 'react-router-dom';

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
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(this.state.fields)
    }).then(resp => resp.json())
    .then( data => {
      console.log('the response is', data);
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.props.handleLogin(data);
        this.props.history.push('/settings')
      }
    });
  }

  render() {
    return (
      <div className="col-xs-12 center-block">
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
    )
  }
}

export default SignUp;
