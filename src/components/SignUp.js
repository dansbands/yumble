import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      fields: {
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
    console.log('submit SignUp');
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(this.state.fields)
    }).then( data => {
      console.log('the response is', data);
      if (data.error) {
        this.setState({ error: true });
      } else {
         console.log('hey');
      }
    });
  }

  // const onFormValueChange = (key, newVal) => {
  //   onChange({
  //     ...value,
  //     [key]: newVal,
  //   }, 'newUser')
  // }

  render() {
    return (
      <div className="col-xs-4 center-block">
        {this.state.error ? <h1>Try Again</h1> : null}
        <h3>Sign Up</h3>
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
