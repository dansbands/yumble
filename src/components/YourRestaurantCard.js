import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/food_placeholder.jpg';

const YourRestaurantCard = (props) => {
  let notYou
  let otherUsers = []
  let userPics
  let restaurantPic = img

  if (props.allUsers) {
    notYou = props.allUsers.filter(u => {
      return u.id !== props.restaurant.user_id
    })
    notYou.map(u => {
      // return props.restaurant.other_users.includes(u.id)
      u.saved_restaurants.map(r => {
        if(r.yelp_id === props.restaurant.yelp_id) {
          otherUsers.push(u)
        }
      })
    })
    userPics = otherUsers.map(u => {
      return <img src={u.photo_url} key={u.id} alt="" className="other-user"/>
    })
  }

  props.restaurant.image_url ? restaurantPic = props.restaurant.image_url : restaurantPic
  // console.log('YourRestaurantCard', props);
  // console.log('YourRestaurantCard notYou', notYou);
  // console.log('YourRestaurantCard otherUsers', otherUsers);
  // console.log('YourRestaurantCard userPics', userPics);

  return (
    <Link
      to="/detail"
      className="link">
      <div id={props.restaurant.id} className="list-group-item media" onClick={e => props.handleClickSavedCard(e, props.restaurant)}>
        <div className="media-left">
            <img src={restaurantPic} alt="" width="50px" style={{height: "50px", overflow: "hidden", borderRadius: "50px"}}/>
        </div>
        <div className="media-body">
          <Link
            to="/favorites"
            className="link">
          <i className="glyphicon glyphicon-trash pull-right trash" name="delete" onClick={e => props.handleClickSavedCard(e, props.restaurant)}></i>
          </Link>

          <h5 className="media-heading">{props.restaurant.name} <text> - {props.restaurant.price}</text></h5>
          <div className="other-user-container">

            {userPics}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default YourRestaurantCard;

// <i className="glyphicon glyphicon-share-alt pull-right"></i>
