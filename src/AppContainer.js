import React, { Component } from 'react';
import RestaurantList from './components/RestaurantList';
import YourRestaurantList from './components/YourRestaurantList';
import RestaurantContainer from './components/RestaurantContainer';
import YourRestaurantDetail from './components/YourRestaurantDetail';
import Search from './components/Search';
import api from './services/api'
import { Route, Switch } from 'react-router-dom';
import Friends from './components/Friends';
import Profile from './components/Profile';


class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      editing: false,
      commonRestaurants: [],
      currentFriend: [],
      currentFriendsRestaurants: [],
      allUsers: [],
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
      user: {
        username: '',
        password: '',
        id: 2
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('AC Props are', this.props);
    console.log('AC nextProps are', nextProps);
    this.getUser(nextProps.currentUser.id)
    this.getAllUsers()
    // this.getUserRestaurants(nextProps.currentUser.id)
  }

  getUser = id => {
    let userId = id ? id : this.state.user.id
    api.data.getUser(userId)
    .then(user => {
      this.setState(prevState => ({
        currentUser: user,
        user: {
          ...this.state.user,
          id: user.id,
          username: user.username,
        }
      }))
      if (user.restaurants) {
        this.setState({
          restaurants: user.restaurants.reverse(),
          currentRestaurant: user.restaurants[0],
        })
      }
      if (user.saved_restaurants) {
        this.setState({ yourRestaurants: user.saved_restaurants.reverse() })
      }
    })
  }

  // getUserRestaurants = userId => {
  //   api.data.getUserRestaurants(userId)
  //   .then(data => {
  //     this.setState({
  //       restaurants: data.reverse(),
  //       currentRestaurant: data[0]
  //     })
  //   })
  // }

  getAllUsers = () => {
    api.data.getAllUsers()
    .then(data => {
      console.log('getAllUsers', data);
      this.setState({
        allUsers: data,
        currentFriend: data[0],
        currentFriendsRestaurants: data[0].saved_restaurants
      },() => this.findCommonRestaurants())
    })
  }

  findCommonRestaurants = () => {
    console.log('yourRestaurants', this.state.yourRestaurants);
    console.log('currentFriendsRestaurants', this.state.currentFriendsRestaurants);
    let commonRestaurants = []
    let yours
    let theirs
    if (this.state.yourRestaurants.length && this.state.currentFriendsRestaurants.length) {
      for (var i = 0; i < this.state.yourRestaurants.length; i++) {
        yours = this.state.yourRestaurants[i]
        for (var j = 0; j < this.state.currentFriendsRestaurants.length; j++) {
          theirs = this.state.currentFriendsRestaurants[j]
          yours.yelp_id === theirs.yelp_id ? commonRestaurants.push(theirs) : commonRestaurants
        }
      }



      // commonRestaurants = this.state.yourRestaurants.filter(r => {
      //   let rest
      //   if (this.state.currentFriendsRestaurants !== []) {
      //     this.state.currentFriendsRestaurants.map(r => rest = r)
      //     console.log('mapping restaurants r', r);
      //     console.log('mapping restaurants rest', rest);
      //     console.log('mapping restaurants', r.yelp_id === rest.yelp_id);
      //     return r.yelp_id === rest.yelp_id
      //   } else {
      //     return []
      //   }
      // })

    }
    console.log('commonRestaurants', commonRestaurants);
    this.setState({ commonRestaurants: commonRestaurants })
  }

  handleRemove = event => {
    api.data.deleteRestaurant(event.target.id)
      .then(() => this.getUser())
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


    api.data.postSavedRestaurant(newRestaurant)
      .then(() => {
        //deleteRestaurant from list of all
        api.data.deleteRestaurant(eventId)
          .then(() => this.getUser())
      })
      .then(() => this.getUser())
  }

  handleClickSavedCard = (event, restaurant) => {
    if (event.target.className.includes("trash")) {
      console.log('delete', restaurant);
      api.data.deleteSavedRestaurant(restaurant.id)
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
    let data = this.state.searchVal
    data.userId = this.state.user.id
    api.data.getFromYelp(this.state.searchVal)
    .then(() => this.getUser())
  }

  handleChangeFriend = id => {
    let newFriend = this.state.allUsers.find( u => u.id === id)
    console.log('handleChangeFriend', newFriend);
    this.setState({ currentFriend: newFriend, currentFriendsRestaurants: newFriend.saved_restaurants }, () => {
      console.log('newFriend in State', this.state.currentFriend);
      console.log('newFriends restaurants in State', this.state.currentFriendsRestaurants);
      this.findCommonRestaurants()
    })
  }

  handleProfileChange = event => {
    event.preventDefault()
    console.log('handleProfileChange', event.target.id, event.target.value);
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        [event.target.id]: event.target.value
      }
    })
  }

  handleUpdateUser = event => {
    console.log('handleUpdateUser', this.state.currentUser);
    api.data.updateUserInfo(this.state.currentUser)
    .then(this.toggleEdit)
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
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
              <Route path="/friends" render={
                routerProps => {
                  return (
                    <div className="row">
                      <Friends
                        allUsers={this.state.allUsers}
                        currentFriend={this.state.currentFriend}
                        friendsRestaurants={this.state.currentFriendsRestaurants}
                        commonRestaurants={this.state.commonRestaurants}
                        onClick={this.handleChangeFriend}/>
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
              <Route path="/profile" render={
                routerProps => {
                  return (
                    <div className="row">
                      <Profile
                        user={this.state.currentUser}
                        editing={this.state.editing}
                        toggleEdit={this.toggleEdit}
                        onChange={this.handleProfileChange}
                        onSubmit={this.handleUpdateUser}/>
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
