import React from 'react';

const RestaurantCard = (props) => {
  // console.log(props);
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

export default RestaurantCard;
