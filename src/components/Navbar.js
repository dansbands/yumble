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
        <nav className="navbar navbar-fixed-top mobile">
          <div className="container-fluid nav-container">
            <div className="col-xs-3">
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <Link
                    to="/settings"
                    className="nav-link"
                    style={{ width: "10px"}}>
                    <i style={{ fontSize: "35px"}} class="material-icons">settings</i>
                  </Link>
                </li>
                <li>
                  {!loggedIn ? (
                    <Link
                      to="/signin"
                      onClick={this.handleLogout}
                      className="nav-link">
                        <span className="glyphicon glyphicon-user"></span>
                        Sign In
                    </Link>
                    ) : (
                      null
                    )}
                </li>

              </ul>
            </div>

            <div className="col-xs-6">
              <div className="center-block">

                <Link to="/" className="navbar-brand ">
                  Yumble
                </Link>
              </div>
            </div>

            <div className="col-xs-3">
              <ul className="nav navbar-nav navbar-right">




                <li>
                  <Link
                    to="/favorites"
                    style={{ width: "10px"}}
                    className="nav-link pull-right">
                    <i style={{ fontSize: "35px"}} className="material-icons pull-right">people</i>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>

        <nav className="navbar navbar-fixed-top desktop">
          <div className="container-fluid nav-container">


            <div className="col-xs-2">
              <Link to="/" className="navbar-brand pull-right">
                Yumble
              </Link>
            </div>

            <div className="col-xs-8">
              <ul className="nav navbar-nav navbar-left">

                <li>
                  <Link
                    to="/favorites"
                    className="nav-link"> Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/friends"
                    className="nav-link">
                    Friends
                  </Link>
                </li>


                <li>
                  <Link
                    to="/settings"
                    className="nav-link">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="nav-link">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>





            <div className="col-xs-2">
              <ul className="nav navbar-nav">
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
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;

// <span className="glyphicon glyphicon-comment"></span>
