import React from 'react';
import img from '../img/food_placeholder.jpg';

const RestaurantShow = (props) => {
  let distance = Math.round(props.restaurant.distance * 0.00621371192)/ 10
  let image_url = img

  if (props.restaurant.image_url !== "") {
    image_url = props.restaurant.image_url
  }
  // console.log('image url', image_url);

  // console.log('RestaurantShow', props.restaurant);
  return (
    <div>
      <div className="main-img">
        <img src={image_url} alt="" width="100%"/>
      </div>

      <div className="fixed-footer-container">
        <div className="fixed-footer">
          <div className="col-xs-8">
            <h4>{props.restaurant.name}</h4>
          </div>
          <div className="col-xs-4">
            <h4 className="pull-right">{distance} mi.</h4>
          </div>
          <div className="row">
            <div className="col-xs-5">
              <h1>
                <i
                  id={props.restaurant.id}
                  onClick={props.handleRemove}
                  className="glyphicon glyphicon-remove-sign pull-left fuscia"></i>
              </h1>
            </div>
            <div className="col-xs-3">
              <h2>

              </h2>
            </div>
            <div className="col-xs-4">
              <h1>
                <i
                  id={props.restaurant.id}
                  onClick={props.handleSelect}
                  className="glyphicon glyphicon-ok-sign pull-right lightgreen"></i>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantShow;

// <i className="glyphicon glyphicon-info-sign grey"></i>
