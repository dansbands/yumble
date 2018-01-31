import React, { Component } from 'react';
// import './App.css';
import RestaurantList from './components/RestaurantList';
import YourRestaurantList from './components/YourRestaurantList';
import RestaurantContainer from './components/RestaurantContainer';
import Search from './components/Search';
import Navbar from './components/Navbar';
import data from './data';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      currentRestaurant: [],
      yourRestaurants: []
    }
  }

  handleRemove = event => {
    console.log('remove', event.target.id);
    let newRestaurants = this.state.restaurants.filter( r => {
      return r.id !== event.target.id
    })
    console.log('newRestaurants', newRestaurants);
    this.setState({
      restaurants: newRestaurants,
      currentRestaurant: newRestaurants[0],
    })
  }

  handleSelect = event => {
    console.log('select', event.target.id);
    let newRestaurant = this.state.restaurants.find( r => {
      return r.id === event.target.id
    })
    console.log('newRestaurant', newRestaurant);
    let newRestaurants = this.state.restaurants.filter( r => {
      return r.id !== event.target.id
    })
    console.log('newRestaurants', newRestaurants);
    this.setState({
      restaurants: newRestaurants,
      currentRestaurant: newRestaurants[0],
      yourRestaurants: [
        ...this.state.yourRestaurants,
        newRestaurant
      ]
    })
  }


  componentDidMount() {
    // fetch('https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=40.705353&longitude=-74.014003', {
    //   headers: {
    //     authorization: 'Bearer Wua9tvPsWwGGyMB-InHKZfE-ZkzjwGZu3zdtO_AwUvY-UEmT_hb774Fvd0h0W53u04Rhqt3ZqTwn-X5mip89zdh50gqcCDKvnUocoLcx3WzhIGNMd8jMKSJVuN9wWnYx'
    //   }
    // })
    // .then(console.log)
    this.setState({
      restaurants: data.businesses,
      currentRestaurant: data.businesses[0]
    })
  }

  render() {
    console.log('newRestaurants in state', this.state.restaurants);
    console.log('yourRestaurants in state', this.state.yourRestaurants);

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
                          restaurant={this.state.currentRestaurant}/>
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
                        restaurant={this.state.currentRestaurant}/>
                      <YourRestaurantList yourRestaurants={this.state.yourRestaurants}/>
                    </div>
                  )}
                } />
            <Route path="/search" component={Search} />
            <Route path="/restaurants" render={
                routerProps => {
                  return (
                    <div className="row">
                      <RestaurantList restaurants={this.state.restaurants}/>
                      <RestaurantContainer
                        handleRemove={this.handleRemove}
                        handleSelect={this.handleSelect}
                        restaurant={this.state.currentRestaurant}/>
                      <YourRestaurantList yourRestaurants={this.state.yourRestaurants}/>
                    </div>
                  )}
                } />
            <Route path="/search" component={Search} />
          </Switch>

        </div>
      </div>
    );
  }
}

export default App;

// <Search />
