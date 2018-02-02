import React from 'react';
import RestaurantShow from './RestaurantShow'
import { Link } from 'react-router-dom';

class RestaurantContainer extends React.Component {



  render() {
    // console.log('RestaurantContainer', this.props);
    return (
      <div className="col-md-4 list center">
        {this.props.restaurant ? (
          <RestaurantShow
            handleRemove={this.props.handleRemove}
            handleSelect={this.props.handleSelect}
            restaurant={this.props.restaurant}/>
        ) : (
            <div>There are no new restaurants. <Link to="/settings">Expand your search area.</Link></div>
        )}
      </div>
    )
  }
}

export default RestaurantContainer;
