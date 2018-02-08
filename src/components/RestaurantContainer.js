import React from 'react';
import RestaurantShow from './RestaurantShow';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class RestaurantContainer extends React.Component {



  render() {
    // console.log('RestaurantContainer', this.props);
    return (
      <div className="col-md-4 list center">
        <RestaurantShow
          handleRemove={this.props.handleRemove}
          handleSelect={this.props.handleSelect}
          />
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   console.log('RestaurantContainer state', state);
//   return {
//     restaurant: state.user.restaurants[0]
//   }
// }

export default RestaurantContainer;
