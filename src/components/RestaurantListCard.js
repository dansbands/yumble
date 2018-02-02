import React from 'react';

const RestaurantListCard = (props) => {
  // console.log('RestaurantCard', props);
  let distance = Math.round(props.restaurant.distance * 0.00621371192)/ 10

  return (
    <div>
      <div className="card item">
        <div className="image">
          <img src={props.restaurant.image_url} alt="" width="50px" />
        </div>
        <div className="content">
          <a className="header">{props.restaurant.name}</a>
          <i className="glyphicon glyphicon-share-alt pull-right"></i>
          <div className="meta">
            {distance} mi.
          </div>
          <div className="description">
            <p>{props.restaurant.location.address1}<br></br>
            {props.restaurant.location.city}</p>
          </div>
          <div className="extra">
            {props.restaurant.price}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantListCard;
