import React from 'react';
import YourRestaurantCard from './YourRestaurantCard';
import { connect } from 'react-redux';

class YourRestaurantList extends React.Component {
  componentDidMount() {
    console.log('YourRestaurantList', this.props);
  }

  render() {
    let restaurants
    if (this.props.yourRestaurants) {
      restaurants = this.props.yourRestaurants.map(restaurant => {
        return (
          <YourRestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            handleClickSavedCard={this.props.handleClickSavedCard} />
        )
      })
    }

    return (
      <div className="col-xs-3 list right">
        <div className="list-heading">
          <h3>Your Restaurants</h3>
        </div>
        {restaurants}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    yourRestaurants: state.users.saved_restaurants
  }
}

export default connect(mapStateToProps)(YourRestaurantList);
