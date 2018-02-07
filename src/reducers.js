import { combineReducers } from 'redux';

const yourRestaurantsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_SAVED_RESTAURANT':
      return action.savedRestaurant;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  yourRestaurants: yourRestaurantsReducer,
});

export default rootReducer;
