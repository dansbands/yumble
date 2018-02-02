import React, { Component } from 'react';
// import './App.css';
import RestaurantList from './components/RestaurantList';
import YourRestaurantList from './components/YourRestaurantList';
import RestaurantContainer from './components/RestaurantContainer';
import RestaurantDetail from './components/RestaurantDetail';
import Search from './components/Search';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
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
    let newRestaurants = this.state.restaurants.filter( r => {
      return r.id !== event.target.id
    })
    this.setState({
      restaurants: newRestaurants,
      currentRestaurant: newRestaurants[0],
    })
  }

  handleSelect = event => {
    let newRestaurant = this.state.restaurants.find( r => {
      return r.id === event.target.id
    })

    fetch('http://localhost:3001/api/v1/saved_restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newRestaurant, this.state.user.id)
    }).then(resp => resp.json())
      .then(console.log)


    let newRestaurants = this.state.restaurants.filter( r => {
      return r.id !== event.target.id
    })
    this.setState({
      restaurants: newRestaurants,
      currentRestaurant: newRestaurants[0],
      yourRestaurants: [
        ...this.state.yourRestaurants,
        newRestaurant
      ]
    })
  }

  handleClickSavedCard = (event, restaurant) => {
    console.log('clicked saved card', event.currentTarget.id, restaurant );
    this.setState({ displayRestaurant: restaurant })
  }

  handleFormChange = (newVal, formName) => {
    this.setState({ [formName]: newVal})
    console.log(newVal, formName);
  }

  handleSubmitSearch = event => {
    console.log('search value', this.state.searchVal);
  }


  componentDidMount() {
    fetch('http://localhost:3001/api/v1/fetch_data')
    .then(resp => resp.json())
    // .then(console.log)
    .then(data => {
      this.setState({
        restaurants: data.businesses,
        currentRestaurant: data.businesses[0]
      })
    })

    // fetch('http://localhost:3001/api/v1/restaurants')
    // .then(resp => resp.json())
    // .then(data => {
    //   this.setState({
    //     restaurants: data,
    //     currentRestaurant: data[0]
    //   })
    // })



    fetch('http://localhost:3001/api/v1/saved_restaurants')
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        yourRestaurants: data
      })
    })
  }

  render() {
    console.log('newRestaurants in state', this.state.restaurants);
    console.log('yourRestaurants in state', this.state.yourRestaurants);
    console.log('state', this.state);

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
                      <RestaurantDetail
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
