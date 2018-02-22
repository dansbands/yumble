import React from 'react';
import img from '../img/food_placeholder.jpg';

let swipeClass = "swipe"

class RestaurantShow extends React.Component {
  state = { swipe: "swipe" }

  componentWillUpdate(nextProps) {
    console.log('RestaurantShow props', this.props.restaurant);
    console.log('RestaurantShow nextProps', nextProps.restaurant);
    if (this.props.restaurant !== nextProps.restaurant) {
      console.log('New Restaurant');
      this.setState({ swipe: "swipe" })

    }
  }

  componentDidMount() {
    // swipeClass = "swipe"

  }

  handleRemove = e => {
    // swipeClass += this.props.swipe
    console.log('handleRemove', this.state);
    e.persist()
    this.setState({ swipe: "swipe-left" },() => {
      setTimeout(() => {
        this.props.handleRemove(e)
        // swipeClass = "swipe"
      }, 25)
    })
  }

  handleSelect = e => {
    // swipeClass += this.props.swipe
    console.log('handleRemove', this.state);
    e.persist()
    this.setState({ swipe: "swipe-right" },() => {
      setTimeout(() => {
        this.props.handleSelect(e)
        // swipeClass = "swipe"
      }, 25)
    })
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
                    onClick={e => this.handleRemove(e)}
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
                    onClick={e => this.handleSelect(e)}
                    className="glyphicon glyphicon-ok-sign pull-right lightgreen"></i>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default RestaurantShow;

// <i className="glyphicon glyphicon-info-sign grey"></i>
