import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component {

    showMenu = () => {
        var x = this.refs.slidemenu;
        x.style.left = "0";
    }
    hideMenu = () => {
        var y = this.refs.slidemenu;
        y.style.left = "-100%";
    }

    cartNumbers = () => {
        if(localStorage.getItem('cartItems')) {
            this.props.pizzaCart.items = JSON.parse(localStorage.getItem('cartItems'))
            const cart = JSON.parse(localStorage.getItem('cartItems'));
            const cartLength = Object.values(cart).flat().length;
            return cartLength;
        }
    }

    render() {
        return (
            <header>
                <nav className="navbar fixed-top navbar-light" id="nav">
                    <div id="collapse" className="col-4 d-flex justify-content-start align-items-center">
                    <button className="navbar-toggler d-md-none" id="butoni-collapse" onClick={this.showMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        <div className="menu-md  d-inline-flex">
                            <li>
                            <Link to="/">Home</Link> 
                            </li>
                            <li>
                            <Link to="/menu">Menu</Link> 
                            </li>
                            <li>
                            <Link to="/contact">Contact</Link> 
                            </li>
                        </div>
                    </div>

                    <div className="col-4 d-flex justify-content-center">
                        <Link to="/">
                            <img src="/images/logo.svg" id="logo" className="img-fluid" alt="Logo" />
                        </Link>
                    </div>

                    <div className=" col-4 d-flex p-0 justify-content-end align-items-center ">
                        <div>
                            <Link to="/cart" title="shopping-cart" className="pl-2">
                            {/* <i className="fas fa-shopping-cart pl-4"></i><span className=" badge badge-pill badge-success count ">{this.props.pizzaCart.items ? this.props.pizzaCart.items.length : ''}</span> */}
                            <i className="fas fa-shopping-cart pl-4"></i><span className=" badge badge-pill badge-success count ">{this.cartNumbers()}</span>

                            </Link>
                            <Link to="/login" className="pl-2"><i className="fas fa-user pl-4"></i></Link>

                        </div>
                    </div>

                    <div className="slidemenu" id="slidemenu" ref="slidemenu">
                        <div className="close">
                            <button id="close"><i className="fas fa-times" onClick={this.hideMenu}></i></button>

                        </div>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/menu">Menu</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/login"><i className="fas fa-user "></i> My Account</Link>
                        </li>
                    </div>
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        pizzaCart: state.pizzaCart
    }
}

export default connect(mapStateToProps)(Header);