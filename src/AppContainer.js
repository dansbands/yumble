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

  handleRemove = event => {
    fetch(`http://localhost:3000/api/v1/restaurants/${event.target.id}`, {
      method: 'DELETE',
    }).then(resp => resp.json())
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

  getRestaurants = () => {
    api.data.getRestaurants()
    .then(data => {
      this.setState({
        restaurants: data.reverse(),
        currentRestaurant: data[0]
      })
    })
  }

  getSavedRestaurants = () => {
    api.data.getSavedRestaurants()
    .then(data => {
      this.setState({
        yourRestaurants: data.reverse()
      })
    })
  }

  handleAuth = () => {
    console.log('handling Auth');
    // fetch('http://localhost:3000/api/v1/auth', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(this.state.user)
    // }).then(console.log)
  }

  handleNewUser = () => {
    console.log('handling Auth');
    // fetch('http://localhost:3000/api/v1/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(this.state.newUser)
    // }).then(console.log)
  }

  getUser = () => {
    console.log('currentUser in props', this.props.currentUser);
    api.data.getUser(this.state.user.id)
    .then(user => {
        console.log('got user', user)
        this.setState({
          ...this.state.user.username,
          username: user.username
        })
        this.setState({ yourRestaurants: user.saved_restaurants.reverse() })
      })
  }


  componentDidMount() {
    this.setState({
      ...this.state.user.id,
        id: this.props.currentUser.id,
    },() => this.getUser())



    this.getRestaurants()
    // this.getSavedRestaurants()
    const token = localStorage.getItem('token');

    if (token) {
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    // console.log('newRestaurants in state', this.state.restaurants);
    // console.log('yourRestaurants in state', this.state.yourRestaurants);
    console.log('AppContainer state', this.state);
    console.log('AppContainer props', this.props.currentUser.id);

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
