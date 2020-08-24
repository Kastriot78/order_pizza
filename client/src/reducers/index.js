import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import pizzaCart from '../reducers/pizza_cart';
import pizzas from '../reducers/pizza_reducers';
import orders from '../reducers/order_reducers';

const rootReducer = combineReducers({
    pizzaCart,
    pizzas,
    orders,
    form: formReducer
})

export default rootReducer;