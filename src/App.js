import React from 'react';
import Navbar from './components/Navbar';
import AppContainer from './AppContainer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Switch } from 'react-router-dom';
import api from './services/api';


class App extends React.Component {
  state = { auth: { currentUser: {} } };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      // localStorage.removeItem('token')
      api.auth.getCurrentUser()
      .then(user => {
        console.log('Got User', user);
        if(!user.error) {
          this.setState({ auth: { currentUser: user } });
        }
      });
    }
  }

  handleLogin = user => {
    console.log('handle login', user);
    localStorage.setItem('token', user.token);
    this.setState({ auth: { currentUser: user } });
  }

  handleLogout = () => {
    console.log('handling logout');
    localStorage.removeItem('token');
    this.setState({ auth: { currentUser: {} } });
  }

  render() {
    // console.log('App State', this.state);
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
                          {...routerProps}
                            handleLogin={this.handleLogin}
                          />
                      </div>
                  )
                }
              } />
            {localStorage.getItem('token') ? (
              <Route
                path="/"
                render={
                  routerProps => {
                    return (
                      <div className="row">
                        <AppContainer
                          {...routerProps}
                          handleLogout={this.handleLogout}
                          currentUser={this.state.auth.currentUser}/>
                      </div>
                    )
                  }
                } />

            ) : (
              <Route
                path="/"

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
            )}
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
