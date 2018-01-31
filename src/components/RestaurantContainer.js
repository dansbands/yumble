import React from 'react';
import RestaurantShow from './RestaurantShow'

class RestaurantContainer extends React.Component {



  render() {
    return (
      <div className="col-xs-4 list center">
        {this.props.restaurant ? (
          <RestaurantShow
            handleRemove={this.props.handleRemove}
            handleSelect={this.props.handleSelect}
            restaurant={this.props.restaurant}/>
        ) : (
            <div>There are no new restaurants. Expand your search area.</div>
        )}
      </div>
    )
  }
}

export default RestaurantContainer;
