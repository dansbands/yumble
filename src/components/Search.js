import React from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from '../actions';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: "",
      searchVal: {
        location: '',
        latitude: 0,
        longitude: 0,
        radius: '',
        term: '',
        price: '',
        savedLocations: {
          defaultLoc: {
            latitude: 40.705353,
            longitude: -74.014003,
          },
          flatironSchool: {
            latitude: 40.705353,
            longitude: -74.014003,
          },
          home: {
            latitude: 40.719657,
            longitude: -74.039520,
          },
        }
      },
    }
  }

// const Search = ({onChange, value, onSubmit}) => {
onFormValueChange = (key, newVal) => {
  this.setState(prevState => ({
    searchVal: {
      ...this.state.searchVal,
        [key]: newVal,
    }
  }))
}

onSavedLocationChange = (newVal) => {
  this.setState(prevState => ({
    currentLocation: newVal,
    searchVal: {
      ...this.state.searchVal,
      latitude: this.state.searchVal["savedLocations"][newVal]["latitude"],
      longitude: this.state.searchVal["savedLocations"][newVal]["longitude"],
    }
  }))
}

// onSubmit = () => {
//   console.log('Submit Search');
// }

render() {
  let data = this.state.searchVal
  data.userId = this.props.user.id
  console.log('Search State', this.state);
  console.log('Search data', data);
    return (
      <div className="col-xs-3 left">
        <div className="list-heading">
          <h3>Search Criteria</h3>
        </div>

        <div className="form-group">
          <label htmlFor="price">Saved Locations</label>
          <select className="rounded form-control"
            id="coordinates"
            placeholder="Choose a saved location..."
            value={this.state.currentLocation}
            onChange={e => this.onSavedLocationChange(e.target.value)}>
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
            value={this.state.location}
            onChange={e => this.onFormValueChange(e.target.id, e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="term">Cuisine</label>
          <input
            className="form-control"
            id="term"
            placeholder="Cuisine"
            value={this.state.term}
            onChange={e => this.onFormValueChange(e.target.id, e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="radius">Distance</label>
          <select
            className="form-control"
            id="radius"
            placeholder="Distance"
            value={this.state.radius}
            onChange={e => this.onFormValueChange(e.target.id, e.target.value)}>
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
            value={this.state.price}
            onChange={e => this.onFormValueChange(e.target.id, e.target.value)}>
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
          onClick={e => this.props.onSubmit(e, this.state.searchVal)}>
          <input className="btn btn-default" type="submit"></input>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, actions)(Search);

// () => this.props.postSearchRequest(data).then(() => this.props.getUser(this.props.user.id))
