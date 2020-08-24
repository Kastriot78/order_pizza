export default function(state = {} , action) {
    switch (action.type) { 
        case 'ALL_PIZZAS':
            return {...state, allPizzas: action.payload.pizzas}
        case 'GET_PIZZA':
            return {...state, pizza: action.payload}
        default:
            return state;
    }
}