import React, { Component } from 'react';
// import './App.css';
import RestaurantList from './components/RestaurantList';
import YourRestaurantList from './components/YourRestaurantList';
import RestaurantContainer from './components/RestaurantContainer';
import YourRestaurantDetail from './components/YourRestaurantDetail';
import Search from './components/Search';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import api from './services/api'
// import data from './data';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      currentRestaurant: [],
      displayRestaurant: [],
      yourRestaurants: [],
      searchVal: {
        location: '',
        latitude: 40.705353,
        longitude: -74.014003,
        distance: '',
        cuisine: '',
        price: ''
      },
      newUser: {
        username: '',
        password: '',
      },
      user: {
        username: '',
        password: '',
        id: 1
      }
    }
  }

  handleRemove = event => {
    // let newRestaurants = this.state.restaurants.filter( r => {
    //   return r.id !== event.target.id
    // })
    //deleteRestaurant
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
    console.log('newRestaurant', newRestaurant);


    // postSavedRestaurant
    fetch('http://localhost:3000/api/v1/saved_restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newRestaurant, this.state.user.id)
    }).then(resp => resp.json())
      .then(() => {
        //deleteRestaurant
        fetch(`http://localhost:3000/api/v1/restaurants/${eventId}`, {
          method: 'DELETE',
        }).then(resp => resp.json())
          .then(() => this.getRestaurants())
      })
    //
      .then(() => this.getSavedRestaurants())
    //   .then(() => this.getRestaurants())



    // let newRestaurants = this.state.restaurants.filter( r => {
    //   return r.id !== event.target.id

      // console.log('newRestaurants', newRestaurants);
    // })
    // this.setState({
    //   restaurants: newRestaurants,
    //   currentRestaurant: newRestaurants[0],
    //   yourRestaurants: [
    //     ...this.state.yourRestaurants,
    //     newRestaurant
    //   ]
    // })
  }


  handleClickSavedCard = (event, restaurant) => {
    if (event.target.className.includes("trash")) {
      console.log('delete', restaurant.id);
      fetch(`http://localhost:3000/api/v1/saved_restaurants/${restaurant.id}`, {
        method: 'DELETE'
      }).then(resp => resp.json())
      .then(() => this.getSavedRestaurants())
    } else {
      console.log('clicked saved card', event.currentTarget.id, restaurant );
      this.setState({ displayRestaurant: restaurant })
    }
  }

  handleFormChange = (newVal, formName) => {
    this.setState({ [formName]: newVal})
    console.log(newVal, formName);
  }

  handleSubmitSearch = event => {
    console.log('search value', this.state.searchVal);
    //send this search value in the body of the request

    // api.data.getFromYelp()
    // .then(() => this.getRestaurants())
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


  componentDidMount() {
    // api.data.getFromYelp()
    this.getRestaurants()
    this.getSavedRestaurants()
  }

  render() {
    console.log('newRestaurants in state', this.state.restaurants);
    // console.log('yourRestaurants in state', this.state.yourRestaurants);
    // console.log('state', this.state);

    return (
      <div className="App">
        <Navbar />
        <div className="container main">
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
            <Route
              path="/signin"
              exact
              render={
                routerProps => {
                  return (
                      <div className="row">
                        <SignIn
                          value={this.state.user}
                          onChange={this.handleFormChange}/>
                      </div>
                  )
                }
              } />
            <Route
              path="/signup"
              exact
              render={
                routerProps => {
                  return (
                      <div className="row">
                        <SignUp
                          value={this.state.newUser}
                          onChange={this.handleFormChange} />
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

        </div>
      </div>
    );
  }
}

export default App;

// <Search />
