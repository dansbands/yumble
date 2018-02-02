import React from 'react';

const RestaurantDetail = (props) => {
  console.log('RestaurantDetail', props);

  // const categories = props.restaurant.categories.map( (c, i) => {
  //   return <li key={i}>{c.title}</li>
  // })

  // const transactions = props.restaurant.transactions.map( (t, i) => {
  //   return <li key={i}>{t}</li>
  // })

//   <ul>
//     {transactions}
//   </ul>
// <p>Categories:</p>
//   <ul>
//     {categories}
//   </ul>

  let distance = Math.round(props.restaurant.distance * 0.00621371192)/ 10

  // return<div>under construction</div>
  return (
    <div className="col-xs-4 list center">
      <i className="glyphicon glyphicon-menu-left"></i>
      <div>
        <img src={props.restaurant.image_url} alt="" width="100%"/>
      </div>
      <div className="col-xs-9">
        <h4>{props.restaurant.name}</h4>
      </div>
      <div className="col-xs-3">
        <h4 className="pull-right">{distance} mi.</h4>
      </div>

      <div className="row">
        <h5>Details:</h5>
          <p>
          {props.restaurant.display_address_1}<br/>
          {props.restaurant.display_address_2}</p>
          <p>
        Phone: {props.restaurant.display_phone}<br/>
        Distance: {distance} miles<br/>
        {props.restaurant.is_closed &&
          <h5>Permanently Closed</h5>
        }
        Price: {props.restaurant.price}<br/>
        Rating: {props.restaurant.rating}<br/>
        Transactions:</p>






      </div>
    </div>
  )
}

export default RestaurantDetail;

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
