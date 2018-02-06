import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

  componentDidMount() {
    // console.log("Navbar User", this.props.currentUser);
  }

  render() {
    return (
      <nav className="navbar navbar-fixed-top">
        <div className="container-fluid">
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
                <Link
                  to="/signin"
                  onClick={this.props.handleLogout}
                  className="nav-link">
                  <span className="glyphicon glyphicon-user"></span> Sign Out
                </Link>
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
              <li><a className="nav-link"><span className="glyphicon glyphicon-comment"></span> Messages</a></li>
              <li>
                <Link
                  to="/favorites"
                  className="nav-link">
                  <span className="glyphicon glyphicon-heart-empty"></span> Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
