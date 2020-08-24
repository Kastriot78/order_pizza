import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home';
import Contact from './components/Contact/contact';
import AddPizza from './components/admin/addPizza';
import AllPizzas from './components/admin/pizzas';
import PizzaDetails from './components/PizzaDetails/pizza_details';
import Cart from './components/cart/cartPizzas';
import Order from './components/Order/order';
import OrderComplete from './components/Order/order_complete';

import Layout from './components/hoc/layout';

export default function Routes() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/addPizza" exact component={AddPizza} />
                <Route path="/menu" exact component={AllPizzas} />
                <Route path="/pizza/:id" exact component={PizzaDetails} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/order" exact component={Order} />
                <Route path="/order-complete/:id" exact component={OrderComplete} />
            </Switch>
        </Layout>
    )
  
}