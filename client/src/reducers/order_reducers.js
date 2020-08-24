export default function(state = {}, action) {
    switch (action.type) {
        case 'ADD_ORDER':
            return {...state, order: action.payload}
        case 'GET_ORDER':
            return {...state, getOrder: action.payload}
        default:
            return state
    }
}