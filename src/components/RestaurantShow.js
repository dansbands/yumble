import React from 'react';
import img from '../img/food_placeholder.jpg';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class RestaurantShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let image_url = img
    let distance

    if (this.props.restaurant) {
      distance = Math.round(this.props.restaurant.distance * 0.00621371192)/ 10
      if (this.props.restaurant.image_url !== "") {
        image_url = this.props.restaurant.image_url
      }
    }


    // console.log('image url', image_url);

    // console.log('RestaurantShow', props.restaurant);
    if (!this.props.restaurant) {
      console.log('no restaurant');
      return <div>There are no new restaurants. <Link to="/settings">Expand your search area.</Link></div>
    } else {
      return (
          <div>
            <div className="main-img">
              <img src={image_url} alt="" width="100%"/>
            </div>

            <div className="col-xs-9">
              <h4>{this.props.restaurant.name}</h4>
            </div>

            <div className="col-xs-3">
              <h4 className="pull-right">{distance} mi.</h4>
            </div>

            <div className="row">

              <div className="col-xs-5">
                <h1>
                  <i
                    id={this.props.restaurant.id}
                    onClick={this.props.handleRemove}
                    className="glyphicon glyphicon-remove-sign pull-left red"></i>
                </h1>
              </div>

              <div className="col-xs-3">
                <h2>
                  <i className="glyphicon glyphicon-info-sign grey"></i>
                </h2>
              </div>

              <div className="col-xs-4">
                <h1>
                  <i
                    id={this.props.restaurant.id}
                    onClick={this.props.handleSelect}
                    className="glyphicon glyphicon-ok-sign pull-right green"></i>
                </h1>
              </div>

            </div>
          </div>
        )
      }
  }
}

const mapStateToProps = state => {
  console.log('RestaurantContainer state', state);
  return {
    restaurant: state.user.restaurants ? state.user.restaurants[0] : []
  }
}

export default connect(mapStateToProps, actions)(RestaurantShow);
