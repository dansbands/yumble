import React, { Component } from 'react';
import RestaurantList from './components/RestaurantList';
import YourRestaurantList from './components/YourRestaurantList';
import RestaurantContainer from './components/RestaurantContainer';
import YourRestaurantDetail from './components/YourRestaurantDetail';
import Search from './components/Search';
import api from './services/api'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';


class AppContainer extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   // restaurants: [],
    //   // currentRestaurant: [],
    //   // displayRestaurant: [],
    //   // yourRestaurants: [],
    //   // currentLocation: "",
    //   searchVal: {
    //     location: '',
    //     latitude: 0,
    //     longitude: 0,
    //     radius: '',
    //     term: '',
    //     price: '',
    //     savedLocations: {
    //       defaultLoc: {
    //         latitude: 40.705353,
    //         longitude: -74.014003,
    //       },
    //       flatironSchool: {
    //         latitude: 40.705353,
    //         longitude: -74.014003,
    //       },
    //       home: {
    //         latitude: 40.719657,
    //         longitude: -74.039520,
    //       },
    //     }
    //   },
    //   // newUser: {
    //   //   username: '',
    //   //   password: '',
    //   // },
    //   // user: {
    //   //   username: '',
    //   //   password: '',
    //   //   id: 2
    //   // }
    // }
  }



  handleRemove = event => {
    api.data.deleteRestaurant(event.target.id)
      .then(() => this.props.getUser(this.props.user.id))
  }

  handleSelect = event => {
    console.log('handleSelect', event.target.id);
    let eventId = parseInt(event.target.id, 10)
    let newRestaurant = this.props.restaurants.find( r => {
      return r.id === eventId
    })
    newRestaurant.user_id = this.props.user.id
    console.log('newRestaurant', newRestaurant);
    console.log('newRestaurantUser', this.props.user.id);


    api.data.postSavedRestaurant(newRestaurant)
      .then(() => api.data.deleteRestaurant(eventId))
      .then(() => this.props.getUser(this.props.user.id))
  }

  handleFormChange = (newVal, formName) => {
    this.setState({ [formName]: newVal})
    console.log("Handle Form Change", newVal, formName);
  }

  handleSubmitSearch = (event, data) => {
    console.log('App handleSubmitSearch event', event);
    console.log('App handleSubmitSearch data', data);
    event.preventDefault()
    let id = this.props.user.id
    data.userId = id
    api.data.getFromYelp(data)
    // this.props.postSearchRequest(data)
    .then(() => this.props.getUser(id))
  }

  // getUser = id => {
  //   let userId = id ? id : this.state.user.id
  //   api.data.getUser(userId)
  //   .then(user => {
  //     console.log('got user', user);
  //     console.log('got users restaurants', user.saved_restaurants);
  //     this.setState(prevState => ({
  //       user: {
  //         ...this.state.user,
  //         id: user.id,
  //         username: user.username,
  //       }
  //     }))
  //     if (user.saved_restaurants) {
  //       this.setState({ yourRestaurants: user.saved_restaurants })
  //     }
  //   })
  // }

  // handleClickSavedCard = (event, restaurant) => {
  //   if (event.target.className.includes("trash")) {
  //     console.log('delete', restaurant);
  //     api.data.deleteSavedRestaurant(restaurant.id)
  //     .then(() => this.getUser())
  //   } else {
  //     console.log('clicked saved card', event.currentTarget.id, restaurant );
  //     this.setState({ displayRestaurant: restaurant })
  //   }
  // }

  render() {
    // console.log('newRestaurants in state', this.state.restaurants);
    // console.log('yourRestaurants in state', this.state.yourRestaurants);
    // console.log('AppContainer state', this.state);
    // console.log('AppContainer props', this.props);

    return (
      <div>
        {this.props.user.id &&
          <Switch>
            <Route
              path="/"
              exact
              render={
                routerProps => {
                  return (
                      <div className="row">
                        <RestaurantContainer
                          handleRemove={this.handleRemove}
                          handleSelect={this.handleSelect}/>
                      </div>
                  )
                }
              } />

            <Route path="/favorites" render={
                routerProps => {
                  return (
                    <div className="row">
                      <RestaurantContainer
                        handleRemove={this.handleRemove}
                        handleSelect={this.handleSelect}/>
                      <YourRestaurantList
                        handleClickSavedCard={this.handleClickSavedCard}/>
                    </div>
                  )}
                } />
              <Route path="/detail" render={
                routerProps => {
                  return (
                    <div className="row">
                      <YourRestaurantDetail />
                      <YourRestaurantList
                        handleClickSavedCard={this.handleClickSavedCard}/>
                    </div>
                  )}
                } />
              <Route path="/settings" render={
                routerProps => {
                  return (
                    <div className="row">
                      <Search onSubmit={this.handleSubmitSearch}/>
                      <RestaurantContainer
                        handleRemove={this.handleRemove}
                        handleSelect={this.handleSelect}/>
                      <YourRestaurantList
                        handleClickSavedCard={this.handleClickSavedCard}/>
                    </div>
                  )}
                } />
            <Route path="/restaurants" render={
                routerProps => {
                  return (
                    <div className="row">
                      <RestaurantList />
                      <RestaurantContainer
                        handleRemove={this.handleRemove}
                        handleSelect={this.handleSelect} />
                        <YourRestaurantList
                          handleClickSavedCard={this.handleClickSavedCard}/>
                    </div>
                  )}
                } />
          </Switch>
        }
        </div>

    );
  }
}

const mapStateToProps = state => {
  // console.log('AppContainer mSTP', state);
  return {
    user: state.user,
    restaurants: state.user.restaurants
  }
}

export default connect(mapStateToProps, actions)(AppContainer);

// <Search />
