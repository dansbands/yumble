import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap';
import image from '../img/profile/placeholder.png';


class CommonRestaurantDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true
    };
  }

  handleClose = () => {
    // this.setState({ show: false });
    this.props.close()
  }

  // handleShow = () => {
  //   this.setState({ show: true });
  // }


 render() {
   console.log('CommonRestaurantDetail', this.props.friend);


   let distance
   let restTel
   let friendTel
   let friendText
   let friendEmail
   let friendImg = image
   let yourImg = image
   // let url = `url(${this.props.friend.photo_url}) -10px 1px / 120px no-repeat` //for background image for circle divs

   if (this.props.restaurant) {
     distance = Math.round(this.props.restaurant.distance * 0.00621371192)/ 10
     restTel = "tel:" + this.props.restaurant.phone
   }

   if (this.props.friend.phone) {
     friendTel = "tel:" + this.props.friend.phone
     friendText = "sms:" + this.props.friend.phone
   } else {
     friendTel = "tel:1-973-486-4884"
     friendText = "sms:1-973-486-4884"
   }

   if (this.props.friend.email) {
     friendEmail = "mailto:" + this.props.friend.email
   } else {
     friendEmail = "mailto:daniel.odea@flatironschool.com?Subject=Check%20Out%20This%20Restaurant%20I%20Found%20On%20Yumble!"
   }

   if (this.props.friend.photo_url) {
     friendImg = this.props.friend.photo_url
   }

   if (this.props.you.photo_url) {
     yourImg = this.props.you.photo_url
   }
   // return<div>under construction</div>
   if (!this.props.restaurant) {
     return <div></div>
   } else {
     return (


       <div>
         <Modal
           bsSize="medium"
           show={this.props.restaurant.id}
           onHide={this.handleClose}>
           <Modal.Header closeButton>

           </Modal.Header>
           <Modal.Body>


         <div className="row text-center">
           <h2 className="match large">It's a Match!</h2>
           <h4 style={{marginBottom: "20px"}}>You and {this.props.friend.firstname} both like this restaurant!</h4>
           <div className="row">
             <div className="match-pic-left">
               <img className="img-circle match-pic" style={{maxWidth: "100px"}} src={yourImg}></img>
             </div>

             <div className="match-pic-right">
               <div className="img-circle match-pic" style={{overflow: "hidden", height: "100px", width: "100px"}}>
                 <img style={{minWidth: "100px", minHeight: "100px", maxWidth: "120px", maxHeight: "120px"}} src={friendImg}></img>
               </div>
             </div>

           </div>

           <div className="text-center match-pic-center">
             <div className="img-circle match-pic-center-frame">
               <img className="match-restaurant-pic match-pic" src={this.props.restaurant.image_url} alt="" width="100%"/>
             </div>
           </div>
         </div>

         <div className="match-text-left">
           <h4>{this.props.restaurant.name}</h4>
           <p>
             {this.props.restaurant.display_address_1}<br/>
           {this.props.restaurant.display_address_2}</p>
         </div>
         <div className="match-text-right">
           <h4>{distance} mi.</h4>
             <p>Price: {this.props.restaurant.price}<br/>
             Rating: {this.props.restaurant.rating}<br/></p>
         </div>

        <button className="btn btn-default orange-wide wide">
          <a href={restTel}>Call {this.props.restaurant.name}</a>
        </button>
        <div className="btn-group wide" style={{width: "90%"}}>
          <button className="btn btn-default button-group orange-btn">
            <a href={friendEmail}>Email {this.props.friend.firstname}</a>
          </button>
          <button className="btn btn-default button-group orange-btn">
            <a href={friendTel}>Call {this.props.friend.firstname}</a>
          </button>
          <button className="btn btn-default button-group orange-btn">
            <a href={friendText}>Text {this.props.friend.firstname}</a>
          </button>
        </div>


       </Modal.Body>
       <Modal.Footer>
         <Button onClick={this.handleClose}>Close</Button>
       </Modal.Footer>
     </Modal>

    </div>


   )
  }
 }
}

export default CommonRestaurantDetail;




// class Example extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//
//     this.handleShow = this.handleShow.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//
//     this.state = {
//       show: true
//     };
//   }
//
//   handleClose() {
//     this.setState({ show: false });
//   }
//
//   handleShow() {
//     this.setState({ show: true });
//   }
//
//   render() {
//     const popover = (
//       <Popover id="modal-popover" title="popover">
//         very popover. such engagement
//       </Popover>
//     );
//     const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
//
//     return (
//       <div>
//         <p>Click to get the full Modal experience!</p>
//
//         <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
//           Launch demo modal
//         </Button>
//
//         <Modal show={this.state.show} onHide={this.handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//
//
//             <h4>Text in a modal</h4>
//             <p>
//               Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </p>
//
//             <h4>Popover in a modal</h4>
//             <p>
//               there is a{' '}
//               <OverlayTrigger overlay={popover}>
//                 <a href="#popover">popover</a>
//               </OverlayTrigger>{' '}
//               here
//             </p>
//
//             <h4>Tooltips in a modal</h4>
//             <p>
//               there is a{' '}
//               <OverlayTrigger overlay={tooltip}>
//                 <a href="#tooltip">tooltip</a>
//               </OverlayTrigger>{' '}
//               here
//             </p>
//
//             <hr />
//
//
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={this.handleClose}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }
//
// // render();
//
//
// <Modal show={this.state.show} onHide={this.handleClose}>
//   <Modal.Header closeButton>
//     <Modal.Title>Modal heading</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//
//   </Modal.Body>
//   <Modal.Footer>
//     <Button onClick={this.handleClose}>Close</Button>
//   </Modal.Footer>
// </Modal>

























// <img style={{ maxWidth: "160px", maxHeight: "160px" }} src={props.friend.photo_url}></img>
// restaurant
// :
// categories
// :
// [{…}]
// coordinates
// :
// {latitude: 40.7046213003984, longitude: -74.0107793876969}
// display_phone
// :
// "(212) 747-1700"
// distance
// :
// 283.651154941696
// id
// :
// "lukes-lobster-fidi-new-york"
// image_url
// :
// "https://s3-media2.fl.yelpcdn.com/bphoto/C5NV5lfsLo2nJDkx3Or9ig/o.jpg"
// is_closed
// :
// false
// location
// :
// {address1: "26 S William St", address2: "", address3: "", city: "New York", zip_code: "10004", …}
// name
// :
// "Luke's Lobster FiDi"
// phone
// :
// "+12127471700"
// price
// :
// "$$"
// rating
// :
// 4.5
// review_count
// :
// 890
// transactions
// :
// (2) ["delivery", "pickup"]
// url

// <div className="col-xs-5">
//   <h1>
//     <i
//       id={props.restaurant.id}
//       onClick={props.handleRemove}
//       className="glyphicon glyphicon-remove-sign pull-left red"></i>
//   </h1>
// </div>
// <div className="col-xs-3">
//   <h2>
//     <i className="glyphicon glyphicon-info-sign grey"></i>
//   </h2>
// </div>
// <div className="col-xs-4">
//   <h1>
//     <i
//       id={props.restaurant.id}
//       onClick={props.handleSelect}
//       className="glyphicon glyphicon-ok-sign pull-right green"></i>
//   </h1>
// </div>
