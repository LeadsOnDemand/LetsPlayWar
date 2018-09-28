import cst from '../constants/cst'

const initialStates = {
    all: [],
    active: []
}

const locationReducer = (state = initialStates, action) => {
    switch (action.type) {
        case cst.LOCATION_GET_ALL: {
            return Object.assign({}, state, {
                all: action.payload
            })
        }
        case cst.LOCATION_ADD_NEW: {
            let locations = [...state.all]
            locations.push(action.payload)
            return Object.assign({}, state, {
                all: [...locations]
            })
        }
        case cst.LOCATION_SET_ACTIVE: {
            let newL = state.all.filter(l => l.id === action.payload ? l : null)
            return Object.assign({}, state, {
                active: [...newL]
            })
        }
        default:
            return state;
    }
}

export default locationReducer