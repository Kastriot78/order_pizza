import React, { Component } from "react";
import { connect } from "react-redux";
import { getPizza, addToCart } from "../../actions/index";
import { Link } from 'react-router-dom';

import "./pizza_details.css";

class PizzaDetails extends Component {
  componentWillMount() {
    this.props.dispatch(getPizza(this.props.match.params.id));
  }

  addPizzaToCart = (product) => {
    this.props.dispatch(addToCart(this.props.pizzaCart.items, product));
  };

  renderPizza = (item) => {
    return item.pizza ? (
      <div className="container pt-5 pb-5 bg-light" key={item.id}>
        <div className="row">
          <div className=" col-sm-12 col-md-6 d-flex justify-content-center">
            <div className="imgbox">
              <img
                className="pic-1 img-fluid"
                src={`/images/${item.pizza.image}`}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <h1 className="text-center">{item.pizza.name}</h1>
            <div className="d-flex justify-content-center pb-3">
              <h1 className="pl-3 text-center">$ {item.pizza.price}</h1>
            </div>

            <div className="qmimi d-flex justify-content-start">
              <p className="pb-3">
                <strong>Description :</strong>
                {item.pizza.description}    
              </p>
            </div>

            <div className="addtocart">
              <button
                className="btn btn-block text-center btn-outline-dark btn-md pl-0 pr-0 "
                onClick={() => this.addPizzaToCart(item)}
              >
                Add To Cart
              </button>
            </div>

            <div className="goback">
              <Link to="/menu"><button className="mt-4 btn btn-block text-center btn-outline-dark btn-md pl-0 pr-0 ">
                Back
              </button> </Link>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  };

  render() {
    return (
      <div>
        <h3 className="text-center pt-4">Pizza Details</h3>
        {this.renderPizza(this.props.pizzas)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    pizzaCart: state.pizzaCart,
    pizzas: state.pizzas,
  };
}

export default connect(mapStateToProps)(PizzaDetails);
