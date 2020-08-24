import axios from 'axios';

export function getAllPizzas() {
    const request = axios.get('https://orderpizza-online.herokuapp.com/server/all-pizzas.php')
    .then(response => response.data);
    return {
        type: 'ALL_PIZZAS',
        payload: request
    }
}

export function getPizza(id) {
    const request = axios.get(`https://orderpizza-online.herokuapp.com/server/getById.php?id=${id}`)
    .then(response => response.data);
    return {
        type: 'GET_PIZZA',
        payload: request
    }
}

export function getOrderById(id) {
    const request = axios.get(`https://orderpizza-online.herokuapp.com/server/getOrderById.php?id=${id}`)
    .then(response => response.data);
    
    return {
        type: 'GET_ORDER',
        payload: request
    }
}

export function addToCart(items,product) {
    const cartItems = items.slice();
    let productInCart = false;
    cartItems.forEach((item) => {
        if(item[0] === product[0]) {
            item.count += 1;
            productInCart = true;
        }
    })
    if(!productInCart) {
        cartItems.push({...product, count: 1});
    }
   
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    return {
        type: 'ADD_TO_CART',
        payload: {cartItems}
        
    }

}

export function decreaseQuantity(items, product) {
    const cartItemss = items.slice();
    let productInCart = false;
    cartItemss.forEach((item) => {
        if(item[0] === product[0]) {
            item.count -= 1;
            productInCart = true;
        }
    })
    if(!productInCart) {
        cartItemss.push({...product, count: 1});
    }
   
    localStorage.setItem("cartItems", JSON.stringify(cartItemss));

    return {
        type: 'QUANTITY_MINUS',
        payload: {cartItemss}
        
    }
}

export function removeFromCart(items, product) {
    const cartRemoveItems = items.slice().filter(item =>item[0] != product[0]) //item[0] position[0] = ID, from php.
    localStorage.setItem('cartItems', JSON.stringify(cartRemoveItems));

    return {
        type: 'REMOVE_FROM_CART',
        payload: {cartRemoveItems}
    }
}
