import React, { Component } from 'react';
import RestaurantList from './components/RestaurantList';
import YourRestaurantList from './components/YourRestaurantList';
import RestaurantContainer from './components/RestaurantContainer';
import YourRestaurantDetail from './components/YourRestaurantDetail';
import Search from './components/Search';
import api from './services/api'
import { Route, Switch } from 'react-router-dom';


class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      currentRestaurant: [],
      displayRestaurant: [],
      yourRestaurants: [],
      currentLocation: "",
      searchVal: {
        location: '',
        latitude: 0,
        longitude: 0,
        radius: '',
        term: '',
        price: '',
        savedLocations: {
          defaultLoc: {
            latitude: 40.705353,
            longitude: -74.014003,
          },
          flatironSchool: {
            latitude: 40.705353,
            longitude: -74.014003,
          },
          home: {
            latitude: 40.719657,
            longitude: -74.039520,
          },
        }
      },
      newUser: {
        username: '',
        password: '',
      },
      user: {
        username: '',
        password: '',
        id: 2
      }
    }
  }

  componentDidMount() {
    api.auth.getCurrentUser()
      .then(data => {
        console.log('GetUser AppContainer', data);
        this.setState(prevState => ({
          user: {
            ...this.state.user,
            id: data.id,
            username: data.username,
          }
        }), () => {
          this.getUser(data.id)
          this.getRestaurants()
        })
      })
  }

  getRestaurants = () => {
    api.data.getRestaurants()
    .then(data => {
      this.setState({
        restaurants: data.reverse(),
        currentRestaurant: data[0]
      })
    })
  }

  getUser = id => {
    let userId = this.state.user.id
    // if (id) {
    //   console.log("got id", id);
    //   userId = id
    // }
    api.data.getUser(userId)
    .then(user => {
      console.log('got user', user);
      console.log('got users restaurants', user.saved_restaurants);
      if (user.saved_restaurants) {
        this.setState({ yourRestaurants: user.saved_restaurants.reverse() })
      }
    })
  }

  handleRemove = event => {
    api.data.deleteRestaurant(event.target.id)
      .then(() => this.getRestaurants())
  }

  handleSelect = event => {
    console.log('handleSelect', event.target.id);
    let eventId = parseInt(event.target.id, 10)
    let newRestaurant = this.state.restaurants.find( r => {
      return r.id === eventId
    })
    newRestaurant.user_id = this.state.user.id
    console.log('newRestaurant', newRestaurant);
    console.log('newRestaurantUser', this.state.user.id);


    // postSavedRestaurant
    fetch('http://localhost:3000/api/v1/saved_restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newRestaurant)
    }).then(resp => resp.json())
      .then(() => {
        //deleteRestaurant
        fetch(`http://localhost:3000/api/v1/restaurants/${eventId}`, {
          method: 'DELETE',
        }).then(resp => resp.json())
          .then(() => this.getRestaurants())
      })
      // .then(() => this.getSavedRestaurants())
      .then(() => this.getUser())
  }

  handleClickSavedCard = (event, restaurant) => {
    if (event.target.className.includes("trash")) {
      console.log('delete', restaurant);
      fetch(`http://localhost:3000/api/v1/saved_restaurants/${restaurant.id}`, {
        method: 'DELETE'
      }).then(resp => resp.json())
      // .then(() => this.getSavedRestaurants())
      .then(() => this.getUser())
    } else {
      console.log('clicked saved card', event.currentTarget.id, restaurant );
      this.setState({ displayRestaurant: restaurant })
    }
  }

  handleFormChange = (newVal, formName) => {
    this.setState({ [formName]: newVal})
    console.log("Handle Form Change", newVal, formName);
  }

  handleSubmitSearch = event => {
    api.data.getFromYelp(this.state.searchVal)
    .then(() => this.getRestaurants())
  }

  render() {
    // console.log('newRestaurants in state', this.state.restaurants);
    // console.log('yourRestaurants in state', this.state.yourRestaurants);
    console.log('AppContainer state', this.state);
    console.log('AppContainer props', this.props);

    return (
      <div>
        {localStorage.getItem('token') &&
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
                          handleSelect={this.handleSelect}
                          restaurant={this.state.currentRestaurant}
                          displayRestaurant={this.state.displayRestaurant}/>
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
                        handleSelect={this.handleSelect}
                        restaurant={this.state.currentRestaurant}
                        displayRestaurant={this.state.displayRestaurant}/>
                      <YourRestaurantList
                        yourRestaurants={this.state.yourRestaurants}
                        handleClickSavedCard={this.handleClickSavedCard}/>
                    </div>
                  )}
                } />
              <Route path="/detail" render={
                routerProps => {
                  return (
                    <div className="row">
                      <YourRestaurantDetail
                        restaurant={this.state.displayRestaurant}/>
                      <YourRestaurantList
                        yourRestaurants={this.state.yourRestaurants}
                        handleClickSavedCard={this.handleClickSavedCard}/>
                    </div>
                  )}
                } />
              <Route path="/settings" render={
                routerProps => {
                  return (
                    <div className="row">
                      <Search
                        value={this.state.searchVal}
                        onChange={this.handleFormChange}
                        onSubmit={this.handleSubmitSearch}/>
                      <RestaurantContainer
                        handleRemove={this.handleRemove}
                        handleSelect={this.handleSelect}
                        restaurant={this.state.currentRestaurant}
                        displayRestaurant={this.state.displayRestaurant}/>
                      <YourRestaurantList
                        yourRestaurants={this.state.yourRestaurants}
                        handleClickSavedCard={this.handleClickSavedCard}/>
                    </div>
                  )}
                } />
            <Route path="/restaurants" render={
                routerProps => {
                  return (
                    <div className="row">
                      <RestaurantList restaurants={this.state.restaurants}/>
                      <RestaurantContainer
                        handleRemove={this.handleRemove}
                        handleSelect={this.handleSelect}
                        restaurant={this.state.currentRestaurant}
                        displayRestaurant={this.state.displayRestaurant}/>
                        <YourRestaurantList
                          yourRestaurants={this.state.yourRestaurants}
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

export default AppContainer;

// <Search />
