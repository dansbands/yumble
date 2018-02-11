import React from 'react';
import { Link } from 'react-router-dom';

const YourRestaurantCard = (props) => {
  console.log('YourRestaurantCard', props);
  return (
    <Link
      to="/detail"
      className="link">
      <div id={props.restaurant.id} className="list-group-item media" onClick={e => props.handleClickSavedCard(e, props.restaurant)}>
        <div className="media-left">
            <img src={props.restaurant.image_url} alt="" width="50px" style={{height: "50px", overflow: "hidden", borderRadius: "50px"}}/>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{props.restaurant.name}</h5>
          <h5>{props.restaurant.price}</h5>
        </div>
          <i className="glyphicon glyphicon-trash pull-right trash" name="delete" onClick={e => props.handleClickSavedCard(e, props.restaurant)}></i>
      </div>
    </Link>
  )
}

export default YourRestaurantCard;

// <i className="glyphicon glyphicon-share-alt pull-right"></i>
