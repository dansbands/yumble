const API_ROOT = `https://floating-fortress-46957.herokuapp.com/api/v1`
// const API_ROOT = `http://192.168.3.57:3000/api/v1`
// const API_ROOT = `http://10.0.0.156:3000/api/v1`
// const API_ROOT = `http://localhost:3000/api/v1`

const token = localStorage.getItem('token')

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const getFromYelp = data => {
  // console.log(data);
  let params = `?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}&term=${data.term}&price=${data.price}&user=${data.userId}`

  return fetch(`${API_ROOT}/fetch_data${params}`)
          .then(resp => resp.json())
}

const getUserRestaurants = userId => {
  return fetch(`${API_ROOT}/users/${userId}/restaurants`)
          .then(resp => resp.json())
}


const getSavedRestaurants = () => {
  return fetch(`${API_ROOT}/saved_restaurants`)
          .then(resp => resp.json())
}

const deleteRestaurant = id => {
  return fetch(`${API_ROOT}/restaurants/${id}`, {
    method: 'DELETE',
  }).then(resp => resp.json())
}

const postSavedRestaurant = newRestaurant => {
  return fetch(`${API_ROOT}/saved_restaurants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newRestaurant)
  }).then(resp => resp.json())
}

const deleteSavedRestaurant = id => {
  return fetch(`${API_ROOT}/saved_restaurants/${id}`, {
    method: 'DELETE',
  }).then(resp => resp.json())
}

const getUser = id => {
  return fetch(`${API_ROOT}/users/${id}`)
    .then(resp => resp.json())
}

const signIn = fields => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(fields)
  }).then(resp => resp.json())
}

const signUp = fields => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(fields)
  }).then(resp => resp.json())
}

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: {
      Authorization: token
    }
  }).then(res => res.json())
}

const getAllUsers = () => {
  return fetch(`${API_ROOT}/users`)
  .then(res => res.json())
}

const updateUserInfo = data => {
  console.log('updateUserInfo', data.id);
  return fetch(`${API_ROOT}/users/${data.id}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data)
  }).then(resp => resp.json())
}


export default {
  data: {
    getFromYelp,
    // getRestaurants,
    getUserRestaurants,
    getSavedRestaurants,
    getUser,
    deleteRestaurant,
    postSavedRestaurant,
    deleteSavedRestaurant,
    getAllUsers,
    updateUserInfo,
  },
  auth: {
    signIn,
    signUp,
    getCurrentUser,
  }
}
