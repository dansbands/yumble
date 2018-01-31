import React from 'react';
import RestaurantCard from './RestaurantCard'

class RestaurantList extends React.Component {


  render() {
    let restaurants
    if (this.props.restaurants) {
      restaurants = this.props.restaurants.map( (restaurant, i) => {
        return <RestaurantCard key={i} restaurant={restaurant} />
      })
    }

    return (
      <div className="col-xs-3 list">
        <h3>All Restaurants</h3>
        {restaurants}
      </div>
    )
  }
}

export default RestaurantList;
