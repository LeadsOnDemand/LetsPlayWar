import cst from '../constants/cst'

const initialStates = {
    // Values: 
    //    0 ==> Available
    //    1 ==> Is taken temporarily
    //    2 ==> Players got it
    // Why to use this system? Because, we could figure out quickly the state of each card
    //    for example, if "availableCards[5] is 0" means, the card is available and the type 
    //    "SPADES", the values is 6 (we start with cst.CARD_AVAILABLE, not 1, so we add 1 more...)
    availableCards: [
        // SPADES
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE,
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE,
        // CLUBS
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE,
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE,
        // HEARTS 
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE,
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE,
        //DIAMS
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE,
        cst.CARD_AVAILABLE, cst.CARD_AVAILABLE, cst.CARD_AVAILABLE
    ],
    round: 0,
    playingCards: [], // { id: playerCard, name: "", cardsWon: [], dealerCard: -1, playerCard: -1}
    maxScore: -1,
    status: cst.STATUS_SET_NEW_GAME,
}

const warReducer = (state = initialStates, action) => {
    switch (action.type) {
        case cst.PLAY_CARDS_DISTRIBUTE: {
            let cards = [...state.availableCards]
            for (let i = 0; i < action.payload.length; i++) {
                cards[action.payload[i].dealerCard] = cst.CARD_TAKEN_TEMPO
                cards[action.payload[i].playerCard] = cst.CARD_TAKEN_TEMPO
            }
            const nextRound = state.round + 1

            return Object.assign({}, state, {
                round: state.round + 1,
                availableCards: [...cards],
                playingCards: action.payload,
                status: nextRound === 10 ? cst.PLAY_END : state.status
            })
        }
        case cst.PLAY_CARDS_SHOW: {
            return Object.assign({}, state, {
                availableCards: action.payload.availableCards,
                playingCards: action.payload.playingCards,
                maxScore: action.payload.maxScore,
            })
        }
        case cst.STATUS_SELECT_PLAYERS: { // no displaying status
            return Object.assign({}, state, {
                playingCards: action.payload,
                status: cst.PLAY_CARDS_DISTRIBUTE
            })
        }
        case cst.STATUS_SET_NEW_CONFIG: { // with NEW: location, dealer, players
            return { ...initialStates }
        }
        case cst.STATUS_SET_NEW_GAME: { // with same: location, dealer, players
            let pCards = [...state.playingCards]
            for (let i = 0; i < pCards.length; i++) {
                pCards[i].cardsWon = []
                pCards[i].dealerCard = -1
                pCards[i].playerCard = -1
            }
            return Object.assign({}, state, {
                availableCards: initialStates.availableCards,
                round: 0,
                maxScore: -1,
                playingCards: [...pCards],
                status: cst.PLAY_CARDS_DISTRIBUTE
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