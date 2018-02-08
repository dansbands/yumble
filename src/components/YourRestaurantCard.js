import React from 'react';
import { Link } from 'react-router-dom';

const YourRestaurantCard = (props) => {
  // console.log('YourRestaurantCard', props);
  return (
    <Link
      to="/detail"
      className="link">
      <div id={props.restaurant.id} className="panel panel-default card" onClick={e => props.handleClickSavedCard(e, props.restaurant)}>

        <div className="image">
          <img src={props.restaurant.image_url} alt="" height="50px" />
          <i className="glyphicon glyphicon-trash pull-right trash" name="delete" onClick={e => props.handleClickSavedCard(e, props.restaurant)}></i>
        </div>
        <div className="content">
          <h5 className="header">{props.restaurant.name}<span className="pull-right">{props.restaurant.price}</span></h5>
      </div>

    </div>

    </Link>
  )
}

export default YourRestaurantCard;
