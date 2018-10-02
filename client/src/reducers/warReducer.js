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
        { id: 26, type: cst.CLUBS, val: 13 },

        { id: 27, type: cst.HEARTS, val: 1 }, { id: 28, type: cst.HEARTS, val: 2 }, { id: 29, type: cst.HEARTS, val: 3 }, { id: 30, type: cst.HEARTS, val: 4 },
        { id: 31, type: cst.HEARTS, val: 5 }, { id: 32, type: cst.HEARTS, val: 6 }, { id: 33, type: cst.HEARTS, val: 7 }, { id: 34, type: cst.HEARTS, val: 8 },
        { id: 35, type: cst.HEARTS, val: 8 }, { id: 36, type: cst.HEARTS, val: 10 }, { id: 37, type: cst.HEARTS, val: 11 }, { id: 38, type: cst.HEARTS, val: 12 },
        { id: 39, type: cst.HEARTS, val: 13 },

        { id: 40, type: cst.DIAMS, val: 1 }, { id: 41, type: cst.DIAMS, val: 2 }, { id: 42, type: cst.DIAMS, val: 3 }, { id: 43, type: cst.DIAMS, val: 4 },
        { id: 44, type: cst.DIAMS, val: 5 }, { id: 45, type: cst.DIAMS, val: 6 }, { id: 46, type: cst.DIAMS, val: 7 }, { id: 47, type: cst.DIAMS, val: 8 },
        { id: 48, type: cst.DIAMS, val: 8 }, { id: 49, type: cst.DIAMS, val: 10 }, { id: 50, type: cst.DIAMS, val: 11 }, { id: 51, type: cst.DIAMS, val: 12 },
        { id: 52, type: cst.DIAMS, val: 13 },
    ],
    round: 0,
    playingCards: [], // { id: playerId, name: "", cardsWon: [], dealerCard: {}, playerCard: {}}
    maxScore: -1,
    status: cst.STATUS_SET_NEW_GAME,
}

const warReducer = (state = initialStates, action) => {
    switch (action.type) {
        case cst.PLAY_CARDS_DISTRIBUTE: {
            let cards = [...state.dealerCards]
            let playing = [...state.playingCards]
            for (let i = 0; i < playing.length; i++) {
                let index = Math.floor(Math.random() * cards.length)
                // Get (physically) a card for the dealer
                playing[i].dealerCard = cards.splice(index, 1)[0]
                index = Math.floor(Math.random() * cards.length)
                // Get (physically) a card for the player
                playing[i].playerCard = cards.splice(index, 1)[0]
            }
            return Object.assign({}, state, {
                round: state.round + 1,
                dealerCards: [...cards],
                playingCards: [...playing],
            })
        }
        case cst.PLAY_RESULT_PLAYER_WON: {
            let allCards = [...state.dealerCards]
            let playing = [...state.playingCards]
            let thePlayer = playing.filter(p => p.id === action.payload ? p : null)
            thePlayer[0].cardsWon.push(thePlayer[0].playerCard)
            thePlayer[0].cardsWon.push(thePlayer[0].dealerCard)
            thePlayer[0].dealerCard = {}
            thePlayer[0].playerCard = {}
            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            console.log("warReducer/PLAY_RESULT_PLAYER_WON/player: " + JSON.stringify(thePlayer, null, 5))
            return Object.assign({}, state, {
                dealerCards: [...allCards],
                playingCards: state.playingCards.map(p => p.id === action.payload ? { ...thePlayer[0] } : p),
                status: state.dealerCards.length >= (state.playingCards.length * 2) ? cst.PLAY_CARDS_DISTRIBUTE : cst.PLAY_END
            })
        }
        case cst.PLAY_RESULT_PLAYER_LOSE: {
            let allCards = [...state.dealerCards]
            let playing = [...state.playingCards]
            let thePlayer = playing.filter(p => p.id === action.payload ? p : null)
            allCards.push(thePlayer[0].playerCard)
            allCards.push(thePlayer[0].dealerCard)
            thePlayer[0].dealerCard = {}
            thePlayer[0].playerCard = {}
            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            console.log("warReducer/PLAY_RESULT_PLAYER_LOSE/player: " + JSON.stringify(thePlayer, null, 5))
            return Object.assign({}, state, {
                dealerCards: [...allCards],
                playingCards: state.playingCards.map(p => p.id === action.payload ? { ...thePlayer[0] } : p),
                status: cst.PLAY_CARDS_DISTRIBUTE
            })
        }
        case cst.PLAY_RESULT_TIE: {
            let allCards = [...state.dealerCards]
            let playing = [...state.playingCards]
            let thePlayer = playing.filter(p => p.id === action.payload ? p : null)
            thePlayer[0].cardsWon.push(thePlayer[0].playerCard)
            allCards.push(thePlayer[0].dealerCard)
            thePlayer[0].dealerCard = {}
            thePlayer[0].playerCard = {}
            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            console.log("warReducer/PLAY_RESULT_TIE/player: " + JSON.stringify(thePlayer, null, 5))
            return Object.assign({}, state, {
                dealerCards: [...allCards],
                playingCards: state.playingCards.map(p => p.id === action.payload ? { ...thePlayer[0] } : p),
                status: state.dealerCards.length >= (state.playingCards.length * 2) ? cst.PLAY_CARDS_DISTRIBUTE : cst.PLAY_END
            })
        }
        case cst.PLAY_SET_MAX_SCORE: {
            return Object.assign({}, state, {
                maxScore: action.payload
            })
        }
        case cst.STATUS_SELECT_PLAYERS: { // no displaying status
            return Object.assign({}, state, {
                playingCards: action.payload
            })
        }
        case cst.PLAY_SET_NEW_ROUND: {
            let pCards = [...state.playingCards]
            for (let i = 0; i < pCards.length; i++) {
                pCards.cardsWon = []
                pCards.dealerCard = {}
                pCards.playerCard = {}
            }
            return Object.assign({}, state, {
                maxScore: -1,
                playingCards: [...pCards],
                dealerCards: [...initialStates.dealerCards]
            })
        }
        case cst.STATUS_SET_NEW_CONFIG: {
            return { ...initialStates }
        }
        case cst.PLAY_END: {
            return { ...initialStates }
        }
        case cst.SET_STATUS: {
            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            console.log("warReducer/SET_STATUS/action.payload: " + action.payload)
            return Object.assign({}, state, {
                status: action.payload
            })
        }
        default:
            return state;
    }
}

export default warReducer