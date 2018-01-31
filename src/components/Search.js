import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {


  render() {
    return (
      <div>
        <h3>Search Criteria</h3>
        <div className="form-group">
          <h5 className="pull-right" >Use Location Services Instead <i class="material-icons">near_me</i></h5>
          <label htmlFor="location">Location</label>
          <input className="form-control" type="text" id="location" placeholder="Location"></input>
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance</label>
          <input className="form-control" type="text" id="distance" placeholder="Distance"></input>
        </div>
        <div className="form-group">
          <label htmlFor="cusine">Cuisine</label>
          <input className="form-control" type="text" id="cusine" placeholder="Cuisine"></input>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input className="form-control" type="text" id="price" placeholder="Price"></input>
        </div>
        <Link to="/">
          <input className="btn btn-default" type="submit" id="price" placeholder="Price"></input>
        </Link>
      </div>
    )
  }
}

export default Search;
