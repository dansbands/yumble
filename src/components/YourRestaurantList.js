import React from 'react';
import YourRestaurantCard from './YourRestaurantCard'

class YourRestaurantList extends React.Component {


  render() {
    let restaurants
    if (this.props.yourRestaurants) {
      restaurants = this.props.yourRestaurants.map( (restaurant, i) => {
        return (
          <YourRestaurantCard
            key={i}
            restaurant={restaurant}
            handleClickSavedCard={this.props.handleClickSavedCard} />
        )
      })
    }

    return (
      <div className="col-xs-12 list">
        <div className="list-heading">
          <h3>Your Restaurants</h3>
        </div>
        {restaurants}
      </div>
    )
  }
}

export default YourRestaurantList;
