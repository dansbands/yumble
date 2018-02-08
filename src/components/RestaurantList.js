import React from 'react';
import RestaurantListCard from './RestaurantListCard';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RestaurantList extends React.Component {
  componentDidMount() {
    this.props.getRestaurants();
  }

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

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.reverse()
  }
}

export default connect(mapStateToProps, actions)(RestaurantList);
