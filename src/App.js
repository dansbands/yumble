import React from 'react';
import Navbar from './components/Navbar';
import AppContainer from './AppContainer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
  state = { auth: { currentUser: {} } };

  componentDidMount() {
    let token = localStorage.getItem('token')

    if (token) {
      return fetch('http://localhost:3000/api/v1/current_user', {
        headers: {
          Authorization: token
        }
      }).then(res => res.json())
      .then(user => {
        if(!user.error) {
          this.setState({ auth: { currentUser: user } });
        }
      })
    }
  }

  handleLogin = user => {
    localStorage.setItem('token', user.token);
    this.setState({ auth: { currentUser: user } });
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { currentUser: {} } });
  }

  render() {
    console.log('App State', this.state);
    return (
      <div className="App">
        <div className="container main">
          <Navbar
            handleLogout={this.handleLogout}
            currentUser={this.state.auth.currentUser}/>
          <Switch>
            <Route
              path="/signin"
              exact
              render={
                routerProps => {
                  return (
                      <div className="row">
                        <SignIn {...routerProps}
                          handleLogin={this.handleLogin} />
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
                          onChange={this.handleFormChange}
                          onSubmit={this.handleNewUser}
                          />
                      </div>
                  )
                }
              } />
            <Route
              path="/"
              render={
                routerProps => {
                  return (
                    <AppContainer {...routerProps} />
                  )
                }
              } />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
