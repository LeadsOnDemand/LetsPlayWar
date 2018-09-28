import cst from '../constants/cst'

const initialStates = {
    dealerCards: [
        { id: 1, type: cst.SPADES, val: 1 }, { id: 2, type: cst.SPADES, val: 2 }, { id: 3, type: cst.SPADES, val: 3 }, { id: 4, type: cst.SPADES, val: 4 },
        { id: 5, type: cst.SPADES, val: 5 }, { id: 6, type: cst.SPADES, val: 6 }, { id: 7, type: cst.SPADES, val: 7 }, { id: 8, type: cst.SPADES, val: 8 },
        { id: 9, type: cst.SPADES, val: 8 }, { id: 10, type: cst.SPADES, val: 10 }, { id: 11, type: cst.SPADES, val: 11 }, { id: 12, type: cst.SPADES, val: 12 },
        { id: 12, type: cst.SPADES, val: 13 },

        { id: 14, type: cst.CLUBS, val: 1 }, { id: 15, type: cst.CLUBS, val: 2 }, { id: 17, type: cst.CLUBS, val: 3 }, { id: 17, type: cst.CLUBS, val: 4 },
        { id: 18, type: cst.CLUBS, val: 5 }, { id: 19, type: cst.CLUBS, val: 6 }, { id: 20, type: cst.CLUBS, val: 7 }, { id: 21, type: cst.CLUBS, val: 8 },
        { id: 22, type: cst.CLUBS, val: 8 }, { id: 23, type: cst.CLUBS, val: 10 }, { id: 24, type: cst.CLUBS, val: 11 }, { id: 25, type: cst.CLUBS, val: 12 },
        { id: 26, type: cst.SPADES, val: 13 },

        { id: 27, type: cst.HEARTS, val: 1 }, { id: 28, type: cst.HEARTS, val: 2 }, { id: 29, type: cst.HEARTS, val: 3 }, { id: 30, type: cst.HEARTS, val: 4 },
        { id: 31, type: cst.HEARTS, val: 5 }, { id: 32, type: cst.HEARTS, val: 6 }, { id: 33, type: cst.HEARTS, val: 7 }, { id: 34, type: cst.HEARTS, val: 8 },
        { id: 35, type: cst.HEARTS, val: 8 }, { id: 36, type: cst.HEARTS, val: 10 }, { id: 37, type: cst.HEARTS, val: 11 }, { id: 38, type: cst.HEARTS, val: 12 },
        { id: 39, type: cst.SPADES, val: 13 },

        { id: 40, type: cst.DIAMS, val: 1 }, { id: 41, type: cst.DIAMS, val: 2 }, { id: 42, type: cst.DIAMS, val: 3 }, { id: 43, type: cst.DIAMS, val: 4 },
        { id: 44, type: cst.DIAMS, val: 5 }, { id: 45, type: cst.DIAMS, val: 6 }, { id: 46, type: cst.DIAMS, val: 7 }, { id: 47, type: cst.DIAMS, val: 8 },
        { id: 48, type: cst.DIAMS, val: 8 }, { id: 49, type: cst.DIAMS, val: 10 }, { id: 50, type: cst.DIAMS, val: 11 }, { id: 51, type: cst.DIAMS, val: 12 },
        { id: 52, type: cst.SPADES, val: 13 },
    ],
    round: 0,
    dealerId: "",
    players: [], // { id: playerId, cardsNum: 0, dealerCard: {}, playerCard: {}}
    winnerId: "",
    isCardShow: false,
    status: cst.STATUS_SELECT_PLAYERS,
}

const warReducer = (state = initialStates, action) => {
    switch (action.type) {
        case cst.STATUS_PLAY: {
            return Object.assign({}, state, {
                status: action.payload
            })
        }
        case cst.STATUS_FINISH: {
            return Object.assign({}, state, {
                status: action.payload
            })
        }
        case cst.STATUS_SELECT_PLAYERS: {
            return Object.assign({}, state, {
                status: action.payload
            })
        }
        case cst.STATUS_SET_NEW_GAME: {
            return Object.assign({}, state, {
                status: action.payload
            })
        }
        case cst.SET_STATUS: {
            return Object.assign({}, state, {
                status: action.payload
            })
        }
        default:
            return state;
    }
}

export default warReducer