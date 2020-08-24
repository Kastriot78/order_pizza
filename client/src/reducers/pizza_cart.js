const initialState = {
    items: []
}
export default function(state = initialState , action) {
    switch (action.type) { 
        case 'ADD_TO_CART':
            return {items: action.payload.cartItems}
        case 'QUANTITY_MINUS':
            return {items: action.payload.cartItemss}
        case 'REMOVE_FROM_CART':
            return {items: action.payload.cartRemoveItems}
        default:
            return state;
    }
}
