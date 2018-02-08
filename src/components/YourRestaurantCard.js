import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

const YourRestaurantCard = (props) => {
  // console.log('YourRestaurantCard', props);
  return (
    <Link
      to="/detail"
      className="link">
      <div id={props.restaurant.id} className="panel panel-default card" onClick={() => props.selectSavedRestaurant(props.restaurant)}>

        <div className="image">
          <img src={props.restaurant.image_url} alt="" width="50px" />
          <i className="glyphicon glyphicon-trash pull-right trash" name="delete" onClick={() => props.deleteSavedRestaurant(props.restaurant.id)}></i>
        </div>
        <div className="content">
          <h5 className="header">{props.restaurant.name}</h5>
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

    </Link>
  )
}

export default connect(null, actions)(YourRestaurantCard);
