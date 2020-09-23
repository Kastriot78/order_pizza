const initialState = {
    items: []
}
export default function(state = initialState , action) {
    switch (action.type) { 
        case 'ADD_TO_CART':
            return {items: action.payload.cartItems}
        case 'QUANTITY_MINUS':
            return {items: action.payload.cartItemss}
        case 'QUANTITY_PLUS':
            return {items: action.payload.cartItemsss}
        case 'REMOVE_FROM_CART':
            return {items: action.payload.cartRemoveItems}
         case 'REMOVE_CART':
            return {items: action.payload.cartAllItems}
        default:
            return state;
    }
}
