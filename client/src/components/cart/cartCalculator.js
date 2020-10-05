import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import util from '../../util';

class CartCalculator extends Component {

    state = {
        selectValue: '€'
    }

    handleChange = (e) => {
        this.setState({selectValue:e.target.value});
    }

    fromEuroToDollar = (valueToConvert) => {
        return '$ ' + util.formatCurrency(valueToConvert * 1.17845);
    }

    renderCartCalculator = (products) => {
        return (
            products.items ?
            products.items.map(item => {
                return (
                    <div>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-condensed" >
                                <div>
                                    <h6 className="my-0">{item[1]}</h6>
                                </div>
                                {/* <span className="text-muted" style={{width:"120px"}}>€ {item[4]}</span> */}
                                <span className="text-muted" style={{width:"120px"}}>{this.state.selectValue == '€' ? '€ ' + item[4] : this.fromEuroToDollar(item[4])}</span>
                            </li>
                            
                        </ul>  
                    </div>
                    
                )
            })
            : null
            
        )
                  
    }

    render() {
        return (
           <div className="cart-calculator">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge badge-primary badge-pill">{this.props.pizzaCart.items.length}</span>
                </h4>

                {this.renderCartCalculator(this.props.pizzaCart)}

                <li className="list-group-item d-flex justify-content-between mb-3">
                    <span>Delivery Cost</span>
                    {/* <strong>€ 5.00</strong> */}
                    <strong>{this.state.selectValue == '€' ? '€ 5.00' : this.fromEuroToDollar(5.00)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (EUR)</span>
                    {/* <strong>€ {util.formatCurrency(this.props.pizzaCart.items.reduce((a, b) => (a + parseFloat(b[4])*b.count), 0) + 5.0)}</strong> */}
                    <strong>
                    {this.state.selectValue == '€' ? '€ ' + util.formatCurrency(this.props.pizzaCart.items.reduce((a, b) => (a + parseFloat(b[4])*b.count), 0) + 5.0) : this.fromEuroToDollar(this.props.pizzaCart.items.reduce((a, b) => (a + parseFloat(b[4])*b.count), 0) + 5.0) }</strong>

                </li>
                <select className="form-control euro-select"
                    value={this.state.selectValue} 
                    onChange={this.handleChange} 
                >
                    <option value="€">€</option>
                    <option value="$">$</option>
                </select>
               
                <ul className="list-group mb-3">
                    <Link to="/order">
                        <button className="btn btn-success mt-2 text-white">
                            Order Now
                        </button>
                    </Link>
                </ul>
           </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state);
    return {
        pizzaCart: state.pizzaCart
    }
}

export default connect(mapStateToProps)(CartCalculator);
