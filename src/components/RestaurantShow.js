import React from 'react';
import img from '../img/food_placeholder.jpg';
import Swipeable from 'react-swipeable';

let swipeClass = "swipe"

class RestaurantShow extends React.Component {
  state = { swipe: "swipe" }

  componentWillUpdate(nextProps) {
    // console.log('RestaurantShow props', this.props.restaurant);
    // console.log('RestaurantShow nextProps', nextProps.restaurant);
    if (this.props.restaurant !== nextProps.restaurant) {
      // console.log('New Restaurant');
      this.setState({ swipe: "swipe" })
    }
  }

  handleRemove = id => {
    // swipeClass += this.props.swipe
    console.log('handleRemove', this.state);
    // e.persist()
    this.setState({ swipe: "swipe-left" },() => {
      setTimeout(() => {
        this.props.handleRemove(id)
        // swipeClass = "swipe"
      }, 25)
    })
  }

  handleSelect = id => {
    // swipeClass += this.props.swipe
    console.log('handleRemove', this.state);
    // e.persist()
    this.setState({ swipe: "swipe-right" },() => {
      setTimeout(() => {
        this.props.handleSelect(id)
        // swipeClass = "swipe"
      }, 25)
    })
  }

  swiping = (e, deltaX, deltaY, absX, absY, velocity) => {
    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }

  swipingLeft = (e, absX) => {
    console.log("You're Swiping to the Left...", e, absX)
    console.log("You're Swiping to the Left", this.props.restaurant.id)
  }

  swipingRight = (e, absX) => {
    console.log("You're Swiping to the Right...", e, absX)
    console.log("You're Swiping to the Right", this.props.restaurant.id)
  }

  swiped = (e, deltaX, deltaY, isFlick, velocity) => {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }

  swipedLeft = (e, deltaX, deltaY, isFlick, velocity) => {
    console.log("You Swiped Left...", e, deltaX, deltaY, isFlick, velocity)
    if (deltaX > 120) {
      this.handleRemove(this.props.restaurant.id)
    }
  }

  swipedRight = (e, deltaX, deltaY, isFlick, velocity) => {
    console.log("You Swiped Right...", e, deltaX, deltaY, isFlick, velocity)
    if (deltaX < -120) {
      this.handleSelect(this.props.restaurant.id)
    }
  }

  swipedUp = (e, deltaY, isFlick) => {
    console.log("You Swiped Up...", e, deltaY, isFlick)
  }





  render() {
    let distance = Math.round(this.props.restaurant.distance * 0.00621371192)/ 10
    let image_url = img

    if (this.props.restaurant.image_url !== "") {
      image_url = this.props.restaurant.image_url
    }
    // console.log('image url', image_url);

    // console.log('RestaurantShow', this.props.restaurant);
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipingLeft={this.swipingLeft}
        onSwipingRight={this.swipingRight}
        onSwipedLeft={this.swipedLeft}
        onSwipedRight={this.swipedRight}
        onSwiped={this.swiped} >
        <div className={this.state.swipe}>
          <div className="main-img">
            <img className="main-restaurant-img" src={image_url} alt="" />
          </div>

          <div className="fixed-footer-container">
            <div className="fixed-footer">
              <div className="col-xs-8">
                <h4>{this.props.restaurant.name}</h4>
              </div>
              <div className="col-xs-4">
                <h4 className="pull-right">{distance} mi.</h4>
              </div>
              <div className="row">
                <div className="col-xs-5">
                  <h1>
                    <i
                      id={this.props.restaurant.id}
                      onClick={() => this.handleRemove(this.props.restaurant.id)}
                      className="glyphicon glyphicon-remove-sign pull-left fuscia"></i>
                  </h1>
                </div>
                <div className="col-xs-3">
                  <h2>

                  </h2>
                </div>
                <div className="col-xs-4">
                  <h1>
                    <i
                      id={this.props.restaurant.id}
                      onClick={() => this.handleSelect(this.props.restaurant.id)}
                      className="glyphicon glyphicon-ok-sign pull-right lightgreen"></i>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Swipeable>
    )

  }
}

export default RestaurantShow;

// <i className="glyphicon glyphicon-info-sign grey"></i>
