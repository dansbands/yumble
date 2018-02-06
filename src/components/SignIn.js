import React from 'react';
import { Link } from 'react-router-dom';

class SignIn extends React.Component {
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
    // e.preventDefault()
    console.log('submit signin');
    fetch('http://localhost:3000/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(this.state.fields)
    }).then(resp => resp.json())
    .then(data => {
      console.log('response is', data);
      if (data.error) {
        this.setState({ error: true });
      } else {
        this.props.handleLogin(data);
        this.props.history.push('/settings')
      }
    });
  }

  // const onFormValueChange = (key, newVal) => {
  //   onChange({
  //     ...value,
  //     [key]: newVal,
  //   }, 'user')
  // }

  render() {
    return (
      <div className="col-xs-4 center-block">
        {this.state.error ? <h1>Try Again</h1> : null}
        <h3>Sign In</h3>
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
            onClick={this.handleSubmit}
            >
            <input className="btn btn-default" type="submit"></input>
          </Link>
          <br></br>
          <Link
            to="/signup"
            className="pull-right">
            Not a user? Sign Up instead.
          </Link>
      </div>
    )
  }
}

export default SignIn;
