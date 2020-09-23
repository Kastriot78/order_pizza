import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { reset } from "redux-form";
import axios from "axios";

class Order extends Component {
  renderInputField = (field) => {
    return (
      <div className="col-12 col-md-12">
        <div className="col-sm-12 col-md-12">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              {...field.input}
              placeholder={field.placeholder}
              autoComplete="nope"
            />
            <span className="text-danger">
              {field.meta.touched ? field.meta.error : ""}
            </span>
          </div>
        </div>
      </div>
    );
  };

  cartNumbers = () => {
    if(localStorage.getItem('cartItems')) {
        this.props.pizzaCart.items = JSON.parse(localStorage.getItem('cartItems'))
        const cart = JSON.parse(localStorage.getItem('cartItems'));
        const cartLength = Object.values(cart).flat().length;
        return cartLength;
    }
  }

  orderImage = (data) => {
    return data.items
      ? data.items.map((item) => {
          return (
            <div className="col-12 col-sm-12 col-md-6">
              <img
                className="card-img-top img-fluid p-2"
                src={`/images/${item[2]}`}
              />
            </div>
          );
        })
      :null
  };

  onSubmit = (data) => {
    let id = "";
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const url = "https://orderingpizza-online.herokuapp.com/server/order.php";
    axios
      .post(url, formData, config)
      // .then(function (response) {
      //   console.log(response.data);
      //   console.log("Order Inserted Successfully");
      // })
      .then(response => {
        this.props.history.push(`/order-complete/${response.data.id}`);
        this.props.dispatch(reset("OrderForm"));
      })
      .catch(function (error) {
        console.log(error.message);
        console.log("ERROR");
      });
     
  };

  render() {
    return (
      this.cartNumbers() > 0 ?
        <div id="CartProducts">
          <div className="container pt-4">
            <h3 className="text-muted text-center">Please complete your Order</h3>
            <hr />
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="row">
                  <div className="col-4 col-sm-4 col-md-6">
                    <div className="row">
                      {this.orderImage(this.props.pizzaCart)}
                    </div>
                  </div>
                  <div className="col-8 col-sm-8 col-md-6">
                    <form
                      onSubmit={this.props.handleSubmit((values) => {
                        this.onSubmit(values);
                      })}
                    >
                      <Field
                        name="name"
                        component={this.renderInputField}
                        placeholder="Name"
                      />

                      <Field
                        name="lastname"
                        component={this.renderInputField}
                        placeholder="Lastname"
                      />

                      <Field
                        name="address"
                        component={this.renderInputField}
                        placeholder="Address"
                      />

                      <Field
                        name="phone"
                        component={this.renderInputField}
                        placeholder="Phone"
                      />

                        <div className="col-12 col-md-12">
                          <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                              <button className="btn btn-success" type="submit">
                                Order now
                              </button>
                              
                            </div>
                          </div>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <div className="container mt-4">
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-info text-center" role="alert">
                  You don't have enough products to continue with order! Go to menu.
                </div>
                <div className="d-flex justify-content-center">
                  <Link to="/menu" className="Home-page">Menu</Link>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.lastname) {
    errors.lastname = "Last name is required";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  }

  return errors;
}

function mapStateToProps(state) {
  console.log(state);
  return {
    pizzaCart: state.pizzaCart,
    orders: state.orders,
  };
}

export default reduxForm({
  validate,
  form: "OrderForm",
  destroyOnUnmount: false,
})(connect(mapStateToProps)(Order));
