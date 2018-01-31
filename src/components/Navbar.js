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
                  <span className="glyphicon glyphicon-cog"></span> Settings
                </Link>
              </li>
              <li>
                <Link to="/restaurants">
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
              <li><a><span className="glyphicon glyphicon-comment"></span> Messages</a></li>
              <li>
                <Link to="/favorites">
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
