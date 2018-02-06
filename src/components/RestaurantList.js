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
        <div className="list-heading">
          <h3>All Restaurants</h3>
        </div>
        {restaurants}
      </div>
    )
  }
}

export default RestaurantList;
