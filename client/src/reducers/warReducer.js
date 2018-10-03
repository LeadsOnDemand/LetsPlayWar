import cst from '../constants/cst'

const localCst = {
    cardAvailable: 0,
    cardTakenTempo: 1,
    cardTakenByPlayers: 2
}

const initialStates = {
    // Values: 
    //    0 ==> Available
    //    1 ==> Is taken temporarily
    //    2 ==> Players got it
    // Why to use this system? Because, we could figure out quickly the state of each card
    //    for example, if "availableCards[5] is 0" means, the card is available and the type 
    //    "SPADES", the values is 6 (we start with 0, not 1, so we add 1 more...)
    availableCards: [
        // SPADES
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
        // CLUBS
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
        // HEARTS 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
        //DIAMS
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0
    ],
    round: 0,
    playingCards: [], // { id: playerCard, name: "", cardsWon: [], dealerCard: -1, playerCard: -1}
    maxScore: -1,
    status: cst.STATUS_SET_NEW_GAME,
}

const warReducer = (state = initialStates, action) => {
    const getAnAvailableListCard = () => {
        let result = []
        let tempoList = []
        for (let j = 0; j < state.playingCards.length; j++) {
            result.push({
                dealerCard: -1,
                playerCard: -1
            })
            let i = -1, k = -1
            let num = Math.floor(Math.random() * state.availableCards.length)
            let isExistInTempo = false
            // for dealerCardCard
            for (i = 0; i < state.availableCards.length; i++) {
                for (k = 0; k < tempoList.length; k++) {
                    if (tempoList[i] === num) {
                        isExistInTempo = true
                        break
                    }
                }
                if (state.availableCards[i] === 0 && !isExistInTempo) {
                    tempoList.push(num)
                    result[j].dealerCard = num
                    break
                }
                num = (num + 1) % state.availableCards.length
            }
            // for "playerCard"
            isExistInTempo = false
            // if no more available card
            if (i === state.availableCards.length) return []
            num = Math.floor(Math.random() * state.availableCards.length)
            // for playerCardCard
            for (i = 0; i < state.availableCards.length; i++) {
                for (k = 0; k < tempoList.length; k++) {
                    if (tempoList[i] === num) {
                        isExistInTempo = true
                        break
                    }
                }
                if (state.availableCards[i] === 0 && !isExistInTempo) {
                    tempoList.push(num)
                    result[j].playerCard = num
                    break
                }
                num = (num + 1) % state.availableCards.length
            }
            if (i === state.availableCards.length) return []
        }
        //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
        console.log("warReducer/getAnAvailableListCard/result: " + JSON.stringify(result, null, 5))
        return result
    }

    const compare = (val1, val2) => {
        const v1 = (val1 + 1) % 14 // we are going to have: 1-13
        const v2 = (val2 + 1) % 14 // we are going to have: 1-13        
        if (v1 === v2) return 0
        if (v1 < v2) return -1
        return 1
    }

    switch (action.type) {
        case cst.STATUS_SET_NEW_ROUND: {
            let availableCards = [...state.availableCards]
            let cards = [...state.playingCards]
            let maxS = state.maxScore
            let newCards = getAnAvailableListCard()
            if (state.round > 0) {
                for (let i = 0; i < cards.length; i++) {
                    let winner = compare(cards[i].playerCard, cards[i].dealerCard)
                    if (winner === 0) { // tie
                        cards[i].cardsWon.push(cards[i].playerCard)
                        availableCards[cards[i].playerCard] = localCst.cardTakenByPlayers // the card won by the player is recorded
                        availableCards[cards[i].dealerCard] = localCst.cardAvailable // available again
                    }
                    else if (winner > 0) { // the player wins both cards
                        cards[i].cardsWon.push(cards[i].playerCard)
                        availableCards[cards[i].playerCard] = localCst.cardTakenByPlayers // the card won by the player is recorded
                        cards[i].cardsWon.push(cards[i].dealerCard)
                        availableCards[cards[i].dealerCard] = localCst.cardTakenByPlayers // the card won by the player (from the dealer) is recorded
                    }
                    else {
                        availableCards[cards[i].playerCard] = localCst.cardAvailable // available again
                        availableCards[cards[i].dealerCard] = localCst.cardAvailable // available again
                    }
                    if (cards[i].cardsWon.length > state.maxScore) maxS = cards[i].cardsWon.length
                }
            }
            let good2Go = state.round < 10
            if (newCards.length > 0) {
                for (let i = 0; i < cards.length; i++) {
                    cards[i].playerCard = newCards[i].playerCard
                    availableCards[newCards[i].playerCard] = localCst.cardTakenTempo // temporarily taken
                    cards[i].dealerCard = newCards[i].dealerCard
                    availableCards[newCards[i].dealerCard] = localCst.cardTakenTempo // temporarily taken
                }

                good2Go = newCards[newCards.length - 1].dealerCard > -1 && newCards[newCards.length - 1].playerCard > -1 && state.round < 10
            }

            return Object.assign({}, state, {
                availableCards: [...availableCards],
                round: good2Go ? state.round + 1 : state.round,
                playingCards: [...cards],
                maxScore: maxS,
                status: good2Go ? cst.PLAY_CARDS_DISTRIBUTE : cst.PLAY_END
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
                pCards.cardsWon = []
                pCards.dealerCard = -1
                pCards.playerCard = -1
            }
            return Object.assign({}, state, {
                cardsIDWonByPlayers: [],
                round: 0,
                maxScore: -1,
                playingCards: [...pCards],
                status: cst.STATUS_SET_NEW_ROUND
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