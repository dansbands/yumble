import React from 'react';
import { Link } from 'react-router-dom';

const Search = ({onChange, value, onSubmit}) => {
  const onFormValueChange = (key, newVal) => {
    onChange({
      ...value,
      [key]: newVal,
    }, 'searchVal')
  }

  const onSavedLocationChange = (newVal) => {
    onChange({
      ...value,
      latitude: value["savedLocations"][newVal]["latitude"],
      longitude: value["savedLocations"][newVal]["longitude"],
      currentLocation: newVal,
    }, 'searchVal')
  }

    return (
      <div className="col-xs-3 left">
        <h3>Search Criteria</h3>

          <div className="form-group">
            <label htmlFor="price">Saved Locations</label>
            <select className="form-control"
                   id="coordinates"
                   placeholder="Choose a saved location..."
                   value={value.currentLocation}
                   onChange={e => onSavedLocationChange(e.target.value)}>
                   <option className="form-control" value="defaultLoc">Choose a saved location...</option>
                   <option className="form-control" value="flatironSchool">Flatiron School</option>
                   <option className="form-control" value="home">Home</option>
                 </select>
          </div>


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
          <label htmlFor="term">Cuisine</label>
          <input
            className="form-control"
            id="term"
            placeholder="Cuisine"
            value={value.term}
            onChange={e => onFormValueChange(e.target.id, e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="radius">Distance</label>
          <select
            className="form-control"
            id="radius"
            placeholder="Distance"
            value={value.radius}
            onChange={e => onFormValueChange(e.target.id, e.target.value)}>
              <option className="form-control" value="">any</option>
              <option className="form-control" value="161">0.1 mi</option>
              <option className="form-control" value="402">0.25 mi</option>
              <option className="form-control" value="805">0.5 mi</option>
              <option className="form-control" value="1207">0.75 mi</option>
              <option className="form-control" value="1609">1 mi</option>
              <option className="form-control" value="4023">2.5 mi</option>
              <option className="form-control" value="8047">5 mi</option>
              <option className="form-control" value="16093">10 mi</option>
              <option className="form-control" value="24140">15 mi</option>
              <option className="form-control" value="32186">20 mi</option>
              <option className="form-control" value="40233">25 mi</option>
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price Range</label>
          <select className="form-control"
                 id="price"
                 placeholder="Price"
                 value={value.price}
                 onChange={e => onFormValueChange(e.target.id, e.target.value)}>
                 <option className="form-control" value="">all</option>
                 <option className="form-control" value="1">$</option>
                 <option className="form-control" value="2">$$</option>
                 <option className="form-control" value="3">$$$</option>
                 <option className="form-control" value="4">$$$$</option>
                 <option className="form-control" value="5">$$$$$</option>
               </select>
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
