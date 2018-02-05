import React from 'react';
import Navbar from './components/Navbar';
import AppContainer from './AppContainer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
  state = { auth: { currentUser: {} } };

  handleLogin = user => {
    localStorage.setItem('token', user.token)
  }

  render() {
    return (
      <div className="App">
        <div className="container main">
          <Navbar />
          <Switch>
            <Route
              path="/signin"
              exact
              render={
                routerProps => {
                  return (
                      <div className="row">
                        <SignIn

                          onChange={this.handleFormChange}
                          onSubmit={this.handleAuth}
                          />
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
          </Switch>
          <AppContainer />
        </div>
      </div>
    )
  }
}

export default App;
