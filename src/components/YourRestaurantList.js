import React from 'react';
import YourRestaurantCard from './YourRestaurantCard';
import { Link } from 'react-router-dom';

class YourRestaurantList extends React.Component {


  render() {
    let restaurants
    if (this.props.yourRestaurants) {
      restaurants = this.props.yourRestaurants.map( (restaurant, i) => {
        return (
          <YourRestaurantCard
            key={i}
            restaurant={restaurant}
            handleClickSavedCard={this.props.handleClickSavedCard}
            allUsers={this.props.allUsers} />
        )
      })
    }

    return (
      <div className="supporting-content right">
        <div className="btn-group pull-right">
          <Link
            to="/favorites"
            className="btn btn-default">Favorites</Link>
          <Link
            to="/friends"
            className="btn btn-default">Friends</Link>
        </div>
        <div className="fixed-heading">

          <div className="list-heading">
            <h3>Your Restaurants</h3>
          </div>
        </div>

        <div className="list list-group">
          {restaurants}
        </div>
      </div>
    )
  }
}

export default YourRestaurantList;
