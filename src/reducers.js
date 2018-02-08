import { combineReducers } from 'redux';
import {
  SELECT_SAVED_RESTAURANT,
  DELETE_RESTAURANT,
  DELETE_SAVED_RESTAURANT,
  GET_RESTAURANTS,
  GET_USER,
} from './actions/types';


const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER:
    console.log('getUser reducer', action);
      return action.payload
    default:
      return state;
  }
}

const restaurantsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return [...action.payload]

    default:
      return state;
  }
}

const yourRestaurantsReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_SAVED_RESTAURANT:
      return action.savedRestaurant;
    case DELETE_RESTAURANT:
      return action.deleteRestaurant;
    case DELETE_SAVED_RESTAURANT:
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  yourRestaurants: yourRestaurantsReducer,
  restaurants: restaurantsReducer,
  users: usersReducer,
});

export default rootReducer;
