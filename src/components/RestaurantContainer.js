import React from 'react';
import RestaurantShow from './RestaurantShow';
import NextRestaurantShow from './NextRestaurantShow';
import { Link } from 'react-router-dom';

class RestaurantContainer extends React.Component {



  render() {
    // console.log('RestaurantContainer', this.props);
    return (
      <div className="screen">
        <div className="screen-left"></div>
        <div className="screen-right"></div>
        {this.props.restaurant ? (
          <div className="slider">
            <NextRestaurantShow
              handleRemove={this.props.handleRemove}
              handleSelect={this.props.handleSelect}
              restaurant={this.props.nextRestaurant}/>
            <RestaurantShow
              handleRemove={this.props.handleRemove}
              handleSelect={this.props.handleSelect}
              restaurant={this.props.restaurant}/>
            <NextRestaurantShow
              handleRemove={this.props.handleRemove}
              handleSelect={this.props.handleSelect}
              restaurant={this.props.nextRestaurant}/>
          </div>
        ) : (
            <div>There are no new restaurants. <Link to="/settings">Expand your search area.</Link></div>
        )}
      </div>
    )
  }
}

export default RestaurantContainer;
