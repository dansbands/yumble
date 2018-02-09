import React from 'react';
import RestaurantShow from './RestaurantShow';
import NextRestaurantShow from './NextRestaurantShow';
import { Link } from 'react-router-dom';

class RestaurantContainer extends React.Component {



  render() {
    // console.log('RestaurantContainer', this.props);
    return (
      <div className="col-xs-12 list">
        {this.props.restaurant ? (
          <div>
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
