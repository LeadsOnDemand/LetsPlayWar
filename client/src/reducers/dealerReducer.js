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
            dealers.push(action.payload)
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
        case cst.DEALER_RESET_ACTIVE: {
            return Object.assign({}, state, {
                active: []
            })
        }
        default:
            return state;
    }
}

export default dealerReducer