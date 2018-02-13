import React from 'react';
import image from '../img/profile/placeholder.png'
import { Link } from 'react-router-dom'

const Profile = props => {
  console.log("Profile Props", props);
  let img = image
  let divClass

  props.editing ? divClass = "profile visible": divClass = "profile"

  if (props.user.photo_url) {
    console.log('User has a photo');
    img = props.user.photo_url
  }

  return (
    <div className="col-xs-3 left">
      <div className="list-heading">
        <h3>User Profile<span className="glyphicon glyphicon-pencil pull-right" onClick={() => props.toggleEdit()}></span></h3>
      </div>
        <div className="row">
          <div className="col-xs-6">
            <h4>{props.user.firstname} {props.user.lastname}</h4>
            <h5>{props.user.location}</h5><br></br>
            <h5>Username: <b>{props.user.username}</b></h5>
          </div>
          <div className="col-xs-6">
            <img className="pull-right" src={img} alt="" width="100%"/>
          </div>
        </div>


          <div className={divClass} onChange={props.onChange}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={props.user.firstname}>
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={props.user.lastname}>
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={props.user.username}>
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={props.user.location}>
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="photo_url">Profile Picture</label>
              <input
                type="text"
                className="form-control"
                id="photo_url"
                value={props.user.photo_url}>
              </input>
            </div>


              <input className="btn btn-default" type="submit" onClick={props.onSubmit}></input>

          </div>




    </div>
  )
}

export default Profile;
