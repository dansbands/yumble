import React, { Component } from 'react';
// import './App.css';
import RestaurantList from './components/RestaurantList'
import YourRestaurantList from './components/YourRestaurantList'
import RestaurantContainer from './components/RestaurantContainer'
import data from './data'


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

        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="col-xs-5">
              <ul className="nav navbar-nav navbar-left">
                <li><a href=""><span className="glyphicon glyphicon-cog"></span> Settings</a></li>
              </ul>
            </div>

            <div className="col-xs-3">
              <div className="center-block">
                <a className="navbar-brand " href="">Yumble</a>
              </div>
            </div>

            <div className="col-xs-4">
              <ul className="nav navbar-nav navbar-right">
                <li><a href=""><span className="glyphicon glyphicon-cutlery"></span> Food</a></li>
                <li><a href=""><span className="glyphicon glyphicon-heart-empty"></span> Favorites</a></li>
                <li><a href=""><span className="glyphicon glyphicon-comment"></span> Messages</a></li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="container main">
          <div className="row">
            <RestaurantList restaurants={this.state.restaurants}/>
            <RestaurantContainer
              handleRemove={this.handleRemove}
              handleSelect={this.handleSelect}
              restaurant={this.state.currentRestaurant}/>
            <YourRestaurantList yourRestaurants={this.state.yourRestaurants}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
