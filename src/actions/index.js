import api from '../services/api';

import {
  SELECT_SAVED_RESTAURANT,
  DELETE_RESTAURANT,
  // DELETE_SAVED_RESTAURANT,
  GET_RESTAURANTS,
  GET_USER
} from './types';

// export function setCurrentRestaurant() {
//   return { type: 'SET_CURRENT_RESTAURANT', payload}
// }

export function getUser(id) {
  console.log('action get user', id);
  return dispatch => {
    api.data.getUser(id)
    .then(data => {
      console.log('action get user response', data)
      dispatch({ type: GET_USER, payload: data })
    })
  }
}

export function getRestaurants() {
  return dispatch => {
    api.data.getRestaurants()
    .then(data => {
      dispatch({ type: GET_RESTAURANTS, payload: data })
    })
  }
}

export function deleteRestaurant(id) {
  return dispatch => {
    api.data.deleteRestaurant(id)
    .then(data => {
      dispatch({ type: DELETE_RESTAURANT, payload: data })
    })
  }
}

export function saveRestaurant(restaurant) {
  return dispatch => {
    api.data.postSavedRestaurant(restaurant)
  }
}

export function selectSavedRestaurant(savedRestaurant) {
  return { type: SELECT_SAVED_RESTAURANT, savedRestaurant }
}

export function deleteSavedRestaurant(id) {
  return dispatch => {
    api.data.deleteSavedRestaurant(id)
    // .then(data => {
    //   console.log('deleteSavedRestaurant action', data);
    // });





    // .then(data => {
    // })
  }
}
