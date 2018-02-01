import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({onChange, value, onSubmit}) => {
  const onFormValueChange = (key, newVal) => {
    onChange({
      ...value,
      [key]: newVal,
    }, 'newUser')
  }

  return (
    <div className="col-xs-4 center-block">
      <h3>Sign Up</h3>
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
          to="/signin"
          className="pull-right">
          Already a user? Sign In instead.
        </Link>
    </div>
  )
}

export default SignUp;
