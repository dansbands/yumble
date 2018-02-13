import React from 'react'
import snake from '../img/profile/snake.png'
import { Link } from 'react-router-dom'

const Friends = props => {
  console.log('Friends', props);
  let friendsRestaurants
  let commonRestaurants
  let image = require(`../img/profile/placeholder.png`)

  const allUsers = props.allUsers.map(f => {
    return (
      <div onClick={() => props.onClick(f.id, "currentFriend")} key= {f.id} className="panel" value={f.id} >
        {f.firstname} {f.lastname}
      </div>
    )
  })

  // const findCurrentFriend = props.allUsers.find(u => {
  //   return u.id === props.currentFriend
  // })

  if (props.currentFriend) {
    console.log('CurrentFriend', props.currentFriend);
  }

  if (props.currentFriend.photo_url) {
    image = props.currentFriend.photo_url
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
    commonRestaurants = props.commonRestaurants.map((r, i) => {
      let img
      if (!r.user_photo_url) {
        img = require(`../img/profile/placeholder.png`)
      } else {
        img = r.user_photo_url
      }
      // if (require(`../img/profile/${r.username}.png`)) {
      //   img = require(`../img/profile/${r.username}.png`)
      // }

      return (
        <Link
          className="link"
          to="/common"
          key={i}
          onClick={e => props.handleClickCommonCard(e, r)}>
          <div className="panel" >
            <h5>{r.name}<span className="pull-right"><img src={img} style={{width: "35px", height: "35px", borderRadius: "35px"}}/></span></h5>
          </div>
        </Link>
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
      <h4>Current Friend:</h4>
        <div className="list-group-item media">
          <div className="media-body">
            <h5>{props.currentFriend.firstname} {props.currentFriend.lastname}</h5>
          </div>
          <div className="media-right">
            <img className="pull-right" src={image} style={{width: "35px", height: "35px", borderRadius: "35px"}}/>
          </div>
        </div>
      <div className="small-list" style={{marginTop: "10px"}}>
        {allUsers}
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

// <div className="form-group">
//   <label htmlFor="pickFriend">Current Friend: {props.currentFriend.firstname} {props.currentFriend.lastname}</label>
//   <select className="rounded form-control"
//          id="pickFriend"
//          placeholder="Choose a friend..."
//          onChange={e => props.onChange(e, "currentFriend")}
//          >
//     <option className="form-control" value="defaultLoc">Choose a friend...</option>
//      {allUsers}
//   </select>
// </div>
