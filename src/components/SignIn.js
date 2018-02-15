import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'

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
    // console.log('submit signin');
    api.auth.signIn(this.state.fields)

    .then(data => {
      console.log('Sign In response is', data);
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
      <div>
        <div className="background">

          <div className="supporting-content center-block signin">
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
        </div>

      </div>
    )
  }
}

export default SignIn;
