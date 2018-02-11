import React from 'react';
import image from '../img/profile/placeholder.png'

const Profile = props => {
  console.log("Profile Props", props);
  let img = image

  if (props.user.photo_url) {
    console.log('User has a photo');
    img = props.user.photo_url
  }

  return (
    <div className="col-xs-3 left">
      <div className="list-heading">
        <h3>User Profile</h3>
      </div>
      <h4>{props.user.firstname} {props.user.lastname}</h4>
      <img src={img} alt="" width="200px"/>

    </div>
  )
}

export default Profile;
