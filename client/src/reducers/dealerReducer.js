import cst from '../constants/cst'

const initialStates = {
    all: [],
    active: []
}

const dealerReducer = (state = initialStates, action) => {
    switch (action.type) {
        case cst.DEALER_GET_ALL: {
            return Object.assign({}, state, {
                all: action.payload
            })
        }
        case cst.DEALER_ADD_NEW: {
            let dealers = [...state.all]
            console.log("dealerReducer/DEALER_ADD_NEW (before): " + JSON.stringify(dealers, null, 5))
            dealers.push(action.payload)
            console.log("dealerReducer/DEALER_ADD_NEW (after): " + JSON.stringify(dealers, null, 5))
            return Object.assign({}, state, {
                all: [...dealers]
            })
        }
        case cst.DEALER_SET_ACTIVE: {
            let newD = state.all.filter(d => d.id === action.payload ? d : null)
            return Object.assign({}, state, {
                active: [...newD]
            })
        }
        default:
            return state;
    }
}

export default dealerReducer