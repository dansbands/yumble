import React from 'react';
import { Link } from 'react-router-dom';

const YourRestaurantDetail = (props) => {
  console.log('YourRestaurantDetail', props);


  let distance = Math.round(props.restaurant.distance * 0.00621371192)/ 10
  let tel = "tel:" + props.restaurant.phone
  let notYou
  let otherUsers = []
  let userPics

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
      return (
        <div className="col-xs-2 text-center">
          <img src={u.photo_url} key={u.id} alt="" className="lg-other-user"/>
          <h5>{u.firstname}</h5>
        </div>
      )
    })
  }
  console.log('YourRestaurantCard', props);
  console.log('YourRestaurantCard otherUsers', otherUsers);
  console.log('YourRestaurantCard userPics', userPics);
  // return<div>under construction</div>
  return (
    <div className="col-xs-4 list center panel panel-default card">
      <Link to="/favorites">
        <i className="glyphicon glyphicon-menu-left" style={{marginBottom: "10px", fontSize: "24px"}}></i>
      </Link>

      <div className="row">
        <div>
          <img src={props.restaurant.image_url} alt="" width="100%"/>
        </div>
        <div className="col-xs-9">
          <h4>{props.restaurant.name}</h4>
        </div>
        <div className="col-xs-3">
          <h4 className="pull-right">{distance} mi.</h4>
        </div>

      </div>

      <div className="row">
        <div className="col-xs-7">
            <p>
            {props.restaurant.display_address_1}<br/>
            {props.restaurant.display_address_2}</p>
            <p>
          <a href={tel}>{props.restaurant.display_phone}</a><br/>
          {props.restaurant.is_closed &&
            <h5>Permanently Closed</h5>
          }
          </p>
        </div>

        <div className="col-xs-5">
          <p className="pull-right">Price: {props.restaurant.price}<br/>
          Rating: {props.restaurant.rating}<br/></p>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 other-user-show">
        {otherUsers.length > 0 &&
          <h5>These friends like {props.restaurant.name}</h5> }
          <div className="row">
            {userPics}
          </div>
        </div>
      </div>

      <div className="text-center">

        <a href={tel}><button className="btn btn-default bottom orange">Call {props.restaurant.name}</button></a>
      </div>
    </div>
  )
}

export default YourRestaurantDetail;

// restaurant
// :
// categories
// :
// [{…}]
// coordinates
// :
// {latitude: 40.7046213003984, longitude: -74.0107793876969}
// display_phone
// :
// "(212) 747-1700"
// distance
// :
// 283.651154941696
// id
// :
// "lukes-lobster-fidi-new-york"
// image_url
// :
// "https://s3-media2.fl.yelpcdn.com/bphoto/C5NV5lfsLo2nJDkx3Or9ig/o.jpg"
// is_closed
// :
// false
// location
// :
// {address1: "26 S William St", address2: "", address3: "", city: "New York", zip_code: "10004", …}
// name
// :
// "Luke's Lobster FiDi"
// phone
// :
// "+12127471700"
// price
// :
// "$$"
// rating
// :
// 4.5
// review_count
// :
// 890
// transactions
// :
// (2) ["delivery", "pickup"]
// url

// <div className="col-xs-5">
//   <h1>
//     <i
//       id={props.restaurant.id}
//       onClick={props.handleRemove}
//       className="glyphicon glyphicon-remove-sign pull-left red"></i>
//   </h1>
// </div>
// <div className="col-xs-3">
//   <h2>
//     <i className="glyphicon glyphicon-info-sign grey"></i>
//   </h2>
// </div>
// <div className="col-xs-4">
//   <h1>
//     <i
//       id={props.restaurant.id}
//       onClick={props.handleSelect}
//       className="glyphicon glyphicon-ok-sign pull-right green"></i>
//   </h1>
// </div>
