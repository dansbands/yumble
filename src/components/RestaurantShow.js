import React from 'react';

const RestaurantShow = (props) => {

  return (
    <div>
      <div className="main-img">
        <img src={props.restaurant.image_url} alt="" width="100%"/>
      </div>
      <div className="col-xs-9">
        <h4>{props.restaurant.name}</h4>
      </div>
      <div className="col-xs-3">
        <h4 className="pull-right">0.2 mi.</h4>
      </div>
      <div className="row">
        <div className="col-xs-5">
          <h1>
            <i
              id={props.restaurant.id}
              onClick={props.handleRemove}
              className="glyphicon glyphicon-remove-sign pull-left red"></i>
          </h1>
        </div>
        <div className="col-xs-3">
          <h2>
            <i className="glyphicon glyphicon-info-sign grey"></i>
          </h2>
        </div>
        <div className="col-xs-4">
          <h1>
            <i
              id={props.restaurant.id}
              onClick={props.handleSelect}
              className="glyphicon glyphicon-ok-sign pull-right green"></i>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default RestaurantShow;
