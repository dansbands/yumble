import React from 'react';
import RestaurantShow from './RestaurantShow'
import { Link } from 'react-router-dom';

let swipe = "swipe"

class RestaurantContainer extends React.Component {
  handleRemove = e => {
    swipe = "right"
    console.log('container handleRemove', e.target.id);
    this.props.handleRemove(e)
  }

  handleSelect = e => {
    swipe = "right"
    console.log('container handleSelect', e.target.id);
    this.props.handleSelect(e)
  }


  render() {
    // console.log('RestaurantContainer', this.props);
    return (
      <div className="main-content">
        {this.props.restaurant ? (
          <RestaurantShow
            swipe={swipe}
            handleRemove={this.handleRemove}
            handleSelect={this.handleSelect}
            restaurant={this.props.restaurant}/>
        ) : (
            <div>There are no new restaurants. <Link to="/settings">Expand your search area.</Link></div>
        )}
      </div>
    )
  }
}

export default RestaurantContainer;
