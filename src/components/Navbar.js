import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {


  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="col-xs-5">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <Link to="/search">
                  <a><span className="glyphicon glyphicon-cog"></span> Settings</a>
                </Link>
              </li>
              <li>
                <Link to="/restaurants">
                  <a><span className="glyphicon glyphicon-cutlery"></span> Food</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-xs-3">
            <div className="center-block">

              <Link to="/" className="navbar-brand ">
                <a>Yumble</a>
              </Link>
            </div>
          </div>

          <div className="col-xs-4">
            <ul className="nav navbar-nav navbar-right">
              <li><a href=""><span className="glyphicon glyphicon-comment"></span> Messages</a></li>
              <li>
                <Link to="/favorites">
                  <a href=""><span className="glyphicon glyphicon-heart-empty"></span> Favorites</a>
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
