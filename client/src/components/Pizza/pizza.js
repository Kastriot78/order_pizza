import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllPizzas, addToCart } from '../../actions/index';

import './pizza.css';

class Pizza extends Component {

    // state = {
    //     inCart: false
    // }

    componentWillMount() {
        this.props.dispatch(getAllPizzas());
    }

    addPizzaToCart = (product) => {
        this.props.dispatch(addToCart(this.props.pizzaCart.items,product))
    }
    
    renderProducts = (products) => {
        return (
            products.allPizzas ?
            products.allPizzas.map(item => {
                return (
                    <div className="col-md-3 col-sm-6" key={item.id}>
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
                            {/* {this.state.inCart?<span>ADDED to cart</span> : ''} */}
                        </div>
                        
                )
            })
            :null
        )
    }

    render() {
        return (
            <div id="pizza">
                <div className="container">
                    <div className="row">
                        {this.renderProducts(this.props.pizzas)}
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