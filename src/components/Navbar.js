import React from 'react';
import { Link } from 'react-router-dom';

let user = "User"

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // THINK ABOUT NEXTPROPS AND WHAT IT LOOKS LIKE
    // MAYBE PULL INFO FROM NEXT PROPS

    // console.log('Navbar Props', this.props);
    // console.log('Navbar nextProps', nextProps);

    // console.log("Navbar User", this.props.currentUser.user);
    // this.setState({ user: this.props.currentUser.user }, () => console.log("Mounted Navbar", this.state))

    if (nextProps.currentUser.user) {
      // console.log('Navbar Receiving Props', nextProps.currentUser);
      user = nextProps.currentUser.user.firstname
    } else {
      user = "User"
    }
  }

  handleLogout = () => {
    console.log('Handling Logout');
    // this.state = {}
    this.props.handleLogout()
  }

  render() {
    // console.log('Navbar State', this.state);
    const loggedIn = !!this.props.currentUser.id;
    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid nav-container">
            <div className="col-xs-5">
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <Link
                    to="/settings"
                    className="nav-link">
                    <span className="glyphicon glyphicon-cog"></span> Settings
                  </Link>
                </li>
                <li>
                  {loggedIn ? (
                  <Link
                    to="/signin"
                    onClick={this.handleLogout}
                    className="nav-link">
                      <span className="glyphicon glyphicon-user"></span> Sign Out {user}
                  </Link>
                    ) : (
                  <Link
                    to="/signin"
                    onClick={this.handleLogout}
                    className="nav-link">
                      <span className="glyphicon glyphicon-user"></span>
                      Sign In
                  </Link>
                    )}
                </li>

              </ul>
            </div>

            <div className="col-xs-3">
              <div className="center-block">

                <Link to="/" className="navbar-brand ">
                  Yumble
                </Link>
              </div>
            </div>

            <div className="col-xs-4">
              <ul className="nav navbar-nav navbar-right">


                

                <li>
                  <Link
                    to="/favorites"
                    className="nav-link"><span className="glyphicon glyphicon-heart-empty"></span> Favorites
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>

        <nav className="navbar navbar-fixed-bottom">
          <div className="container-fluid nav-container">
            <div className="col-xs-5">
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <Link
                    to="/settings"
                    className="nav-link">
                    <span className="glyphicon glyphicon-cog"></span> Settings
                  </Link>
                </li>
                <li>
                  {loggedIn ? (
                  <Link
                    to="/signin"
                    onClick={this.handleLogout}
                    className="nav-link">
                      <span className="glyphicon glyphicon-user"></span> Sign Out {user}
                  </Link>
                    ) : (
                  <Link
                    to="/signin"
                    onClick={this.handleLogout}
                    className="nav-link">
                      <span className="glyphicon glyphicon-user"></span>
                      Sign In
                  </Link>
                    )}
                </li>
                <li>
                  <Link
                    to="/restaurants"
                    className="nav-link">
                    <span className="glyphicon glyphicon-cutlery"></span> All the Food
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-xs-3">
              <div className="center-block">

                <Link to="/" className="navbar-brand ">
                  Yumble
                </Link>
              </div>
            </div>

            <div className="col-xs-4">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link
                    to="/profile"
                    className="nav-link">
                     <span><i className="material-icons">people</i></span> Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/friends"
                    className="nav-link">
                     <span><i className="material-icons">people</i></span> Friends
                  </Link>
                </li>

                <li>
                  <Link
                    to="/favorites"
                    className="nav-link"><span className="glyphicon glyphicon-heart-empty"></span> Favorites
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;

// <span className="glyphicon glyphicon-comment"></span>
