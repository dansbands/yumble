import api from '../services/api';

// export function setCurrentRestaurant() {
//   return { type: 'SET_CURRENT_RESTAURANT', payload}
// }

export function deleteRestaurant(id) {
  return dispatch => {
    api.data.deleteRestaurant(id)
    .then(data => {
      dispatch({ type: 'DELETE_RESTAURANT' })
    })
  }
}

export function saveRestaurant(restaurant) {
  return dispatch => {
    api.data.postSavedRestaurant(restaurant)
  }
}

export function selectSavedRestaurant(savedRestaurant) {
  return { type: 'SELECT_SAVED_RESTAURANT', savedRestaurant }
}
