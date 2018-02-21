import React from 'react'
import snake from '../img/profile/snake.png'
import { Link } from 'react-router-dom'

class Friends extends React.Component {
  render() {
    console.log('Friends', this.props);
    let friendsRestaurants
    let commonRestaurants
    let image = require(`../img/profile/placeholder.png`)
    let currentFriendName = <h5>Please select a friend to dine with.</h5>

    const allUsers = this.props.allUsers.map(f => {
      return (
        <div onClick={() => this.props.onClick(f.id, "currentFriend")} key= {f.id} className="panel" value={f.id} >
          {f.firstname} {f.lastname}
        </div>
      )
    })

    // const findCurrentFriend = this.props.allUsers.find(u => {
    //   return u.id === this.props.currentFriend
    // })

    if (this.props.currentFriend.firstname) {
      console.log('CurrentFriend Name', this.props.currentFriend.firstname);
        currentFriendName = <h5>{this.props.currentFriend.firstname} {this.props.currentFriend.lastname}</h5>
    }

    if (this.props.currentFriend.photo_url) {
      image = this.props.currentFriend.photo_url
      console.log('CurrentFriend', this.props.currentFriend);
    }

    if (this.props.friendsRestaurants) {
      friendsRestaurants = this.props.friendsRestaurants.map(r => {
        return (
          <div key={r.id} className="panel">
            <h5>{r.name}</h5>
          </div>
        )
      })
    }

    if (this.props.commonRestaurants.length) {
      commonRestaurants = this.props.commonRestaurants.map((r, i) => {
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

            <div key={i} className="panel" onClick={e => this.props.handleClickUser(e, this.props.currentFriend, r)}>
              <h5>{r.name}<span className="pull-right"><img src={img} style={{width: "35px", height: "35px", borderRadius: "35px"}}/></span></h5>
            </div>

        )
      })
    } else {
      commonRestaurants = <div>You Have No Restaurants in Common</div>
    }

  // return <div>Your Friends</div>








    return (
      <div className="supporting-content right">
        <div className="btn-group pull-right">
          <Link
            to="/favorites"
            className="btn btn-default">Favorites</Link>
          <Link
            to="/friends"
            className="btn btn-default">Friends</Link>
        </div>



        <div className="list-heading">
          <h3>Your Friends</h3>
        </div>
        <h4>Current Friend:</h4>
        <div className="list-group-item media">
          <div className="media-body">
            {currentFriendName}
          </div>
          <div className="media-right">
            <img className="pull-right" src={image} style={{width: "35px", height: "35px", borderRadius: "35px"}}/>
          </div>
        </div>
        <div className="small-list" style={{marginTop: "10px"}}>
          {allUsers}
        </div>
        <div className="list-heading">
          <h3>{this.props.currentFriend.firstname}'s Matched Restaurants ({commonRestaurants.length})</h3>
        </div>
        <div className="small-list">
          {commonRestaurants}
        </div>
        <div style={{display: "none"}}>
          <div className="list-heading">
            <h3>Your Friend's Restaurants ({friendsRestaurants.length})</h3>
          </div>
          <div className="small-list">
            {friendsRestaurants}
          </div>
        </div>

      </div>
    )
  }
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
