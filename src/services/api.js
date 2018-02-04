const API_ROOT = `http://localhost:3000/api/v1`

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

const getFromYelp = data => {
  console.log(data);
  // let mapped = data.map( d => {
  //   console.log('key', d.key);
  //   console.log('value', d.value);
  //   return d.key=d.value
  // })
  let params = `?radius=${data.radius}&price=${data.price}`

  return fetch(`${API_ROOT}/fetch_data${params}`)
          .then(resp => resp.json())


          // .then(console.log)
          // .then(data => {
          //   this.setState({
          //     restaurants: data.businesses,
          //     currentRestaurant: data.businesses[0]
          //   })
          // })
}

const getRestaurants = () => {
  return fetch(`${API_ROOT}/restaurants`)
          .then(resp => resp.json())
}

const getSavedRestaurants = () => {
  return fetch(`${API_ROOT}/saved_restaurants`)
          .then(resp => resp.json())
}

export default {
  data: {
    getFromYelp,
    getRestaurants,
    getSavedRestaurants,
  }
}
