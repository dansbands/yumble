import React from 'react'

const Friends = props => {
  console.log('Friends', props);
  let friendsRestaurants
  let commonRestaurants

  const allUsers = props.allUsers.map(f => {
    return <option key= {f.id} className="form-control" value={f.id}>{f.firstname} {f.lastname}</option>
  })

  // const findCurrentFriend = props.allUsers.find(u => {
  //   return u.id === props.currentFriend
  // })

  if (props.currentFriend) {
    console.log('CurrentFriend', props.currentFriend);
  }

  if (props.friendsRestaurants) {
    friendsRestaurants = props.friendsRestaurants.map(r => {
      return (
        <div key={r.id} className="panel">
          <h5>{r.name}</h5>
        </div>
      )
    })
  }

  if (props.commonRestaurants.length) {
    commonRestaurants = props.commonRestaurants.map(r => {
      return (
        <div key={r.id} className="panel">
          <h5>{r.name}</h5>
        </div>
      )
    })
  } else {
    commonRestaurants = <div>You Have No Restaurants in Common</div>
  }

  // return <div>Your Friends</div>

  return (
    <div className="col-xs-3 left">
      <div className="list-heading">
        <h3>Your Friends</h3>
      </div>
      <div className="form-group">
        <label htmlFor="pickFriend">Current Friend: {props.currentFriend.firstname} {props.currentFriend.lastname}</label>
        <select className="rounded form-control"
               id="pickFriend"
               placeholder="Choose a friend..."
               onChange={e => props.onChange(e, "currentFriend")}
               >
          <option className="form-control" value="defaultLoc">Choose a friend...</option>
           {allUsers}
        </select>
      </div>
      <div className="list-heading">
        <h3>Your Friend's Restaurants ({friendsRestaurants.length})</h3>
      </div>
      <div className="small-list">
        {friendsRestaurants}
      </div>
      <div className="list-heading">
        <h3>Your Common Restaurants ({commonRestaurants.length})</h3>
      </div>
      <div className="small-list">
        {commonRestaurants}
      </div>
    </div>
  )
}

export default Friends;
