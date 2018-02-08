import React from 'react';
import Navbar from './components/Navbar';
import AppContainer from './AppContainer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Route, Switch } from 'react-router-dom';
import api from './services/api';
import { connect } from 'react-redux';
import * as actions from './actions';
import { withRouter } from 'react-router';

class App extends React.Component {
  state = { auth: { currentUser: {} } };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      // localStorage.removeItem('token')
      api.auth.getCurrentUser()
      .then(user => {
        console.log('Got User', user);
        console.log('App Props', this.props);
        this.props.getUser(user.id)
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
    localStorage.removeItem('token');
    this.setState({ auth: { currentUser: {} } });
  }

  render() {
    // console.log('App State', this.state);
    console.log('App Props User', this.props.user.id ? "we have a user" : "no user", this.props.user);
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
            {this.state.auth.currentUser.id &&
                <Route
                  path="/"
                  render={
                    routerProps => {
                      return (
                        <AppContainer
                          {...routerProps}
                          currentUser={this.state.auth.currentUser}/>
                      )
                    }
                  } />
              }
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log('App mSTP', state);
  return {
    user: state.user,
  }
}

// export default App;
export default withRouter(connect(mapStateToProps, actions)(App))
