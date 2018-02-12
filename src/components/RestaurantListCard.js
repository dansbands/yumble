import React from 'react';

const RestaurantListCard = (props) => {
  // console.log('RestaurantCard', props);
  let distance = Math.round(props.restaurant.distance * 0.00621371192)/ 10

  return (
    <div>
      <div className="list-group-item media">
        <div className="media-left">
          <img src={props.restaurant.image_url} alt="" width="50px" style={{height: "50px", overflow: "hidden", borderRadius: "50px"}}/>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{props.restaurant.name}</h5>
          <h5>{distance} mi.</h5>
          <h5>{props.restaurant.price}</h5>
            <p>{props.restaurant.location.address1}
            {props.restaurant.location.city}</p>
        </div>
      </div>
    </div>
  )
}

export default RestaurantListCard;
