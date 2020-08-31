import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAllPizzas, addToCart } from '../../actions/index';

import './pizza.css';

class Pizza extends Component {

    state = {
        search: ''
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value})
    }

    componentWillMount() {
        this.props.dispatch(getAllPizzas());
    }

    addPizzaToCart = (product) => {
        this.props.dispatch(addToCart(this.props.pizzaCart.items,product))
        let data = this.props.pizzaCart.items.find(item => item[0] == product[0]) //sepse product[0] osht id - ne php kshtu vjen objekti prandaj
    
        if(data) {
         toast.error('Product exists on cart!');
        } else {
          toast.success('Product added to cart.');
        }
    }
    
    renderProducts = (products) => {
        let filteredProducts = products.allPizzas ? products.allPizzas.filter((pizza) => {
            return pizza[1].indexOf(this.state.search) !== -1; // [0] id,[1] is name -> from php
        }) : null;
        return (
            filteredProducts ?
            filteredProducts.map(item => {
                return (
                    <div className="col-md-3 col-sm-6 mt-3" key={item.id}>
                            <div className="product-grid2">
                                <div className="product-image2">
                                    <a href="javascript:;;;">
                                    <img class="pic-1" src={`/images/${item[2]}`} />
                                </a>
                                <ul class="social">
                                    <Link to={`/pizza/${item[0]}`}><li><a href="javascript:;;" data-tip="Quick View"><i className="fa fa-eye"></i></a></li></Link>
                                    <li><a href="javascript:;;" data-tip="Add to Cart" onClick={() => this.addPizzaToCart(item)}><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                                <a class="add-to-cart" href="javascript:;;" onClick={() => this.addPizzaToCart(item)}>Add to cart</a>
                                </div>
                                <div class="product-content">
                                    <h3 class="title"><a href="javascript:;;">501&reg; {item[1]}</a></h3>
                                    <span class="price">$ {item[4]}</span>
                                </div>
                            </div>
                        </div>
                        
                )
            })
            :null
        )
    }

    render() {
        return (
            <div id="pizza">
            <div className="container d-flex justify-content-center">
              <div className="active-cyan-4 col-md-8 col-sm-6 mt-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.search}
                  onChange={this.updateSearch}
                />
              </div>
            </div>
                <div className="container">
                    <div className="row">
                        {this.renderProducts(this.props.pizzas)}
                        <ToastContainer />
                    </div>
                </div>
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    console.log(state);
    return {
        pizzaCart: state.pizzaCart,
        pizzas: state.pizzas
    }
}

export default connect(mapStateToProps)(Pizza);
