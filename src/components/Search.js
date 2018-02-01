import React from 'react';
import { Link } from 'react-router-dom';

const Search = ({onChange, value, onSubmit}) => {

  const onFormValueChange = (key, newVal) => {
    onChange({
      ...value,
      [key]: newVal,
    }, 'searchVal')
  }

    return (
      <div className="col-xs-3 left">
        <h3>Search Criteria</h3>
        <div className="form-group">
          <i className="material-icons pull-right">near_me</i>
          <label htmlFor="location">Location</label>
          <input
            className="form-control"
            id="location"
            placeholder="Location"
            value={value.location}
            onChange={e => onFormValueChange(e.target.id, e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance</label>
          <input
            className="form-control"
            id="distance"
            placeholder="Distance"
            value={value.distance}
            onChange={e => onFormValueChange(e.target.id, e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine</label>
          <input
            className="form-control"
            id="cuisine"
            placeholder="Cuisine"
            value={value.cuisine}
            onChange={e => onFormValueChange(e.target.id, e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input className="form-control"
                 id="price"
                 placeholder="Price"
                 value={value.price}
                 onChange={e => onFormValueChange(e.target.id, e.target.value)}></input>
        </div>
        <Link
          to="/"
          onClick={onSubmit}>
          <input className="btn btn-default" type="submit"></input>
        </Link>
      </div>
    )

}

export default Search;
