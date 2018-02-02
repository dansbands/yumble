import React from 'react';
import RestaurantListCard from './RestaurantListCard'

class RestaurantList extends React.Component {


  render() {
    let restaurants
    if (this.props.restaurants) {
      restaurants = this.props.restaurants.map( (restaurant, i) => {
        return <RestaurantListCard key={i} restaurant={restaurant} />
      })
    }

    return (
      <div className="col-xs-3 list left">
        <h3>All Restaurants</h3>
        {restaurants}
      </div>
    )
  }
}

export default RestaurantList;
