import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({onChange, value, onSubmit}) => {
  const onFormValueChange = (key, newVal) => {
    onChange({
      ...value,
      [key]: newVal,
    }, 'user')
  }

  return (
    <div className="col-xs-4 center-block">
      <h3>Sign In</h3>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            value={value.username}
            onChange={e => onFormValueChange(e.target.name, e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            placeholder="Password"
            value={value.password}
            onChange={e => onFormValueChange(e.target.name, e.target.value)}></input>
        </div>


        <Link
          to="/settings"
          onClick={onSubmit}>
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

export default SignIn;
