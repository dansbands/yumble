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
import CommonRestaurantDetail from './components/CommonRestaurantDetail';


class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usingLocationServices: "Use Location Services",
      currentUser: [],
      editing: false,
      commonRestaurants: [],
      currentCommonRestaurant: [],
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
    this.getAllUsers()
    this.getUser(nextProps.currentUser.id)
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

  findCurrentFriend = id => {
    console.log('handleChangeFriend', newFriend);
    console.log('handleChangeFriend AllUsers', this.state.allUsers);
    let newFriend = this.state.allUsers.find( u => u.id === id)
    if (newFriend) {
      this.setState({ currentFriend: newFriend, currentFriendsRestaurants: newFriend.saved_restaurants }, () => {
        console.log('newFriend in State', this.state.currentFriend);
        console.log('newFriends restaurants in State', this.state.currentFriendsRestaurants);
        this.findCommonRestaurants()
      })
    }
  }

  getAllUsers = () => {
    api.data.getAllUsers()
    .then(data => {
      console.log('getAllUsers', data);
      this.setState({
        allUsers: data,
      },() => {
        this.findCommonRestaurants()
        this.findCurrentFriend(this.state.currentUser.current_friend)
      })
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
    }
    console.log('commonRestaurants', commonRestaurants);
    this.setState({
      commonRestaurants: commonRestaurants,
     })
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
    let commonRestaurant = this.state.currentFriendsRestaurants.find(r => r.yelp_id === newRestaurant.yelp_id)
    newRestaurant.user_id = this.state.user.id
    console.log('newRestaurant', newRestaurant);
    console.log('commonRestaurant', commonRestaurant);
    console.log('newRestaurantUser', this.state.user.id);

    if (commonRestaurant) {
      this.setState({ currentCommonRestaurant: newRestaurant})
    }
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

  handleClickCommonCard = (event, user, restaurant) => {
      console.log('clicked common card', restaurant, user );
      if (user) {
        this.setState({ currentFriend: user })
      }
      this.setState({ currentCommonRestaurant: restaurant })
  }

  handleFormChange = (newVal, formName) => {
    if (newVal.latitude !== this.state.searchVal.latitude) {
      console.log('Latitude', newVal);
      this.setState({ usingLocationServices: "Use Location Services" })
    }
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
    let data = { id: this.state.currentUser.id, current_friend: id }
    api.data.updateUserInfo(data)
    this.findCurrentFriend(id)
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

  handleClickUser = (event, user, restaurant) => {
    console.log('clicked user', user);
    console.log('clicked user restaurant', restaurant);
    this.handleClickCommonCard(event, user, restaurant)
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleGetLocation = event => {
    console.log('getting location', event);
    if ("geolocation" in navigator) {
    	navigator.geolocation.getCurrentPosition(p => {
        console.log("geolocation is available", p.coords.latitude, p.coords.longitude)
        this.setState({
          usingLocationServices: "Using Your Current Location",
          searchVal: {
            ...this.state.searchVal,
            latitude: p.coords.latitude,
            longitude: p.coords.longitude,
            currentLocation: "Using Your Current Location",
          }
        })
      })
    }
  }

  render() {
    // console.log('newRestaurants in state', this.state.restaurants);
    // console.log('yourRestaurants in state', this.state.yourRestaurants);
    console.log('AppContainer state', this.state);
    console.log('AppContainer props', this.props);

    return (
      <div>
        {localStorage.getItem('token') &&
          <div>
            <CommonRestaurantDetail
              close={this.handleClickCommonCard}
              restaurant={this.state.currentCommonRestaurant}
              friend={this.state.currentFriend}
              you={this.state.currentUser}/>

          <Switch>
            <Route
              path="/"
              exact
              render={
                routerProps => {
                  return (
                      <div className="row">
                        <CommonRestaurantDetail
                          close={this.handleClickCommonCard}
                          restaurant={this.state.currentCommonRestaurant}
                          friend={this.state.currentFriend}
                          you={this.state.currentUser}/>
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
                        handleClickSavedCard={this.handleClickSavedCard}
                        allUsers={this.state.allUsers}/>
                    </div>
                  )}
                } />
              <Route path="/detail" render={
                routerProps => {
                  return (
                    <div className="row">
                      <YourRestaurantDetail
                        handleClickUser={this.handleClickUser}
                        allUsers={this.state.allUsers}
                        restaurant={this.state.displayRestaurant}/>
                      <YourRestaurantList
                        yourRestaurants={this.state.yourRestaurants}
                        handleClickSavedCard={this.handleClickSavedCard}
                        allUsers={this.state.allUsers}/>
                      <CommonRestaurantDetail
                        close={this.handleClickCommonCard}
                        restaurant={this.state.currentCommonRestaurant}
                        friend={this.state.currentFriend}
                        you={this.state.currentUser}/>
                    </div>
                  )}
                } />
              <Route path="/settings" render={
                routerProps => {
                  return (
                    <div className="row">
                      <Search
                        usingLocation={this.state.usingLocationServices}
                        getLocation={this.handleGetLocation}
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
                        handleClickSavedCard={this.handleClickSavedCard}
                        allUsers={this.state.allUsers}/>
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
                          handleClickSavedCard={this.handleClickSavedCard}
                          allUsers={this.state.allUsers}/>
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
                        currentCommonRestaurant={this.state.currentCommonRestaurant}
                        onClick={this.handleChangeFriend}
                        handleClickCommonCard={this.handleClickCommonCard}/>
                      <RestaurantContainer
                        handleRemove={this.handleRemove}
                        handleSelect={this.handleSelect}
                        restaurant={this.state.currentRestaurant}
                        displayRestaurant={this.state.displayRestaurant}/>
                        <YourRestaurantList
                          yourRestaurants={this.state.yourRestaurants}
                          handleClickSavedCard={this.handleClickSavedCard}
                          allUsers={this.state.allUsers}/>
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
                          handleClickSavedCard={this.handleClickSavedCard}
                          allUsers={this.state.allUsers}/>
                    </div>
                  )}
                } />
              <Route path="/common" render={
                routerProps => {
                  return (
                    <div className="row">
                      <Friends
                        allUsers={this.state.allUsers}
                        currentFriend={this.state.currentFriend}
                        friendsRestaurants={this.state.currentFriendsRestaurants}
                        commonRestaurants={this.state.commonRestaurants}
                        currentCommonRestaurant={this.state.currentCommonRestaurant}
                        onClick={this.handleChangeFriend}
                        handleClickCommonCard={this.handleClickCommonCard}/>
                      <CommonRestaurantDetail
                        close={this.handleClickCommonCard}
                        restaurant={this.state.currentCommonRestaurant}
                        friend={this.state.currentFriend}
                        you={this.state.currentUser}/>
                        <YourRestaurantList
                          yourRestaurants={this.state.yourRestaurants}
                          handleClickSavedCard={this.handleClickSavedCard}
                          allUsers={this.state.allUsers}/>
                    </div>
                  )}
                } />
          </Switch>
          </div>
        }
        </div>

    );
  }
}

export default AppContainer;

// <Search />
