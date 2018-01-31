import React from 'react';

const YourRestaurantCard = (props) => {
  console.log(props);
  return (
    <div>
      <div className="card item">
        <div className="image">
          <img src={props.restaurant.image_url} alt="" width="50px" />
        </div>
        <div className="content">
          <a className="header">{props.restaurant.name}</a>
          <div className="meta">
            <span>Description</span>
          </div>
          <div className="description">
            <p>{props.restaurant.location.address1}<br></br>
            {props.restaurant.location.city}</p>
          </div>
          <div className="extra">
            Additional Details
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourRestaurantCard;
