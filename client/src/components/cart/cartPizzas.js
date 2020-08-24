import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import CartCalculator from "./cartCalculator";
import { addToCart, decreaseQuantity, removeFromCart } from '../../actions/index';

import "./cart.css";

class CartPizzas extends Component {

    addPizzaToCart = (product) => {
      this.props.dispatch(addToCart(this.props.pizzaCart.items,product))
    }

    decreaseQuantity = (product) => {
      this.props.dispatch(decreaseQuantity(this.props.pizzaCart.items, product))
    }

    removeFromCart = (product) => {
      this.props.dispatch(removeFromCart(this.props.pizzaCart.items, product))
    }

    renderCartProducts = (products) => {
        return (
            products.items ?
                products.items.map(item => {
                    return (
                        <div className="col-6 col-sm-4 col-md-4">
                            <div className="card mb-4 shadow-sm" key={item.id}>
                                <img className="card-img-top img-fluid p-2" src={`/images/${item[2]}`}/>
                                <div className="card-body">
                                    <h6 class="card-text">{item[1]}.</h6>
                                    <div className="d-flex justify-content-end align-items-center">
                                    <a onClick={() => this.removeFromCart(item)} href="javascript:;;" className="p-2">
                                        <i className="fa fa-trash"></i>
                                    </a>
                                    <div className="btn-group">
                                        <button onClick={() => this.addPizzaToCart(item)} class=" btn btn-outline-primary"><i class="far fa-plus-square"></i></button>
                                        <h3 class="text-center d-block my-auto pl-2 pr-2">{ item.count }</h3>
                                        <button onClick={() => this.decreaseQuantity(item)}class="btn btn-outline-primary" id="zvogloSasinBtn"><i class="far fa-minus-square"></i></button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            :null
        )
    }

    renderErrorCart = () => {
       return (
           this.props.pizzaCart.items.length < 1 ?
            <div className="error-template container">
                <h1>Oops!</h1>
                <h2>No Pizzas Found</h2>
                <div className="error-details">Your cart is empty</div>
                <div className="error-actions">
                    <Link to="/menu">Take me to Menu</Link>
                </div>
            </div>
        : ''
       )
    }

  render() {
    return (
      <div id="CartProducts">
        <div className="container">
          <div className="cart-products">
            <div className="row mt-5">
              <div className="col">
                <h4 className="text-center pb-2">Cart Products</h4>
                <hr />
                <div className="row">
                  
                    {this.renderCartProducts(this.props.pizzaCart)}
                    {this.renderErrorCart()}
                  
                </div>
              </div>
              <div className="col-12 col-md-4">
                <CartCalculator />
               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        pizzaCart: state.pizzaCart,
        pizzas: state.pizzas
    }
}

export default connect(mapStateToProps)(CartPizzas);
