import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOrderById } from "../../actions/index";

class OrderComplete extends Component {
  componentWillMount() {
    this.props.dispatch(getOrderById(this.props.match.params.id));
  }

  renderOrder(item) {
    return item.getOrder ? (
      <div className="container content">
        <br />
        <h3>Order complete!</h3>

        <p>Your order will arrive soon.</p>

        <div>
          <dl>
            <dt>Order Number</dt>
            <dd>{item.getOrder.id}</dd>

            <dt>Shipping Address</dt>
            <dd>{item.getOrder.address}</dd>

            <dt>Personal Details</dt>
            <dd>
              {item.getOrder.name} {item.getOrder.lastname},{item.getOrder.phone}
            </dd>
          </dl>
        </div>
        <div>
          <Link to="/" className="btn btn-success">
            Go Home Page
          </Link>
        </div>
      </div>
    ) : null;
  }

  render() {
    return (
      <div>
        {this.renderOrder(this.props.orders)}
      </div>
    );
  }
}

function mapStateToProps(state) {
    console.log(state)
  return {
    orders: state.orders,
  };
}

export default connect(mapStateToProps)(OrderComplete);
