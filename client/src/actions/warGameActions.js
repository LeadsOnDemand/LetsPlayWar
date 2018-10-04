import axios from "axios"
import cst from '../constants/cst'

const localCst = {
    CARD_AVAILABLE: 0,
    CARD_TAKEN_TEMPO: 1,
    CARD_TAKEN_BY_PLAYERS: 2
}

const getAnAvailableListCard = (war) => {
    let result = []
    let tempoList = []
    for (let j = 0; j < war.playingCards.length; j++) {
        result.push({
            dealerCard: -1,
            playerCard: -1
        })
        let i = -1, k = -1
        let num = Math.floor(Math.random() * war.availableCards.length)
        let isExistInTempo = false
        // for dealerCardCard
        for (i = 0; i < war.availableCards.length; i++) {
            isExistInTempo = false
            for (k = 0; k < tempoList.length; k++) {
                if (tempoList[i] === num) {
                    isExistInTempo = true
                    break
                }
            }
            if (war.availableCards[i] === localCst.CARD_AVAILABLE && !isExistInTempo) {
                tempoList.push(num)
                result[j].dealerCard = num
                break
            }
            num = (num + 1) % war.availableCards.length
        }
        // if no more available card
        if (i === war.availableCards.length) return []
        num = Math.floor(Math.random() * war.availableCards.length)
        // for playerCardCard
        for (i = 0; i < war.availableCards.length; i++) {
            isExistInTempo = false
            for (k = 0; k < tempoList.length; k++) {
                if (tempoList[i] === num) {
                    isExistInTempo = true
                    break
                }
            }
            if (war.availableCards[i] === localCst.CARD_AVAILABLE && !isExistInTempo) {
                tempoList.push(num)
                result[j].playerCard = num
                break
            }
            num = (num + 1) % war.availableCards.length
        }
        if (i === war.availableCards.length) return []
    }
    return result
}

const compare = (val1, val2) => {
    const v1 = (val1 % 13) + 1 // we are going to have: 1-13
    const v2 = (val2 % 13) + 1 // we are going to have: 1-13    

    if (v1 === v2) return 0
    else if (v1 < v2) return -1
    return 1
}

const getNewCards = (war) => {
    let newCards = getAnAvailableListCard(war)
    let cards = [...war.playingCards]
    for (let i = 0; i < cards.length; i++) {
        cards[i].playerCard = newCards[i].playerCard
        cards[i].dealerCard = newCards[i].dealerCard
    }
    return cards
}

const getScores = (war) => {
    let availableCards = [...war.availableCards]
    let cards = [...war.playingCards]
    let maxScore = war.maxScore
    for (let i = 0; i < cards.length; i++) {
        let winner = compare(cards[i].playerCard, cards[i].dealerCard)
        if (winner === 0) { // tie
            cards[i].cardsWon.push(cards[i].playerCard)
            availableCards[cards[i].playerCard] = localCst.CARD_TAKEN_BY_PLAYERS // the card won by the player is recorded
            availableCards[cards[i].dealerCard] = localCst.CARD_AVAILABLE // available again
        }
        else if (winner > 0) { // the player wins both cards
            cards[i].cardsWon.push(cards[i].playerCard)
            availableCards[cards[i].playerCard] = localCst.CARD_TAKEN_BY_PLAYERS // the card won by the player is recorded
            cards[i].cardsWon.push(cards[i].dealerCard)
            availableCards[cards[i].dealerCard] = localCst.CARD_TAKEN_BY_PLAYERS // the card won by the player (from the dealer) is recorded
        }
        else {
            availableCards[cards[i].playerCard] = localCst.CARD_AVAILABLE // available again
            availableCards[cards[i].dealerCard] = localCst.CARD_AVAILABLE // available again
        }
        if (cards[i].cardsWon.length > war.maxScore) maxScore = cards[i].cardsWon.length
    }
    return {
        availableCards: availableCards,
        playingCards: cards,
        maxScore: maxScore
    }
}

const warGameActions = {
    setStatus: (newStatus) => {
        return dispatch => dispatch({
            type: cst.SET_STATUS,
            payload: newStatus
        })
    },

    playGame: () => {
        return (dispatch, getState) => {
            let war = getState().war
            let newCards = getNewCards(war)
            if (war.status === cst.PLAY_CARDS_DISTRIBUTE) {
                if (war.round === 0)
                    dispatch({
                        type: cst.PLAY_CARDS_DISTRIBUTE,
                        payload: newCards
                    })
                else
                    dispatch({
                        type: cst.PLAY_CARDS_SHOW,
                        payload: getScores(war)
                    })
                dispatch({
                    type: cst.SET_STATUS,
                    payload: cst.PLAY_CARDS_SHOW
                })
            }
            else if (war.status === cst.PLAY_CARDS_SHOW) {
                // Game OVER!!!!!
                if (newCards.length === 0 || war.round >= 10) {
                    let location = getState().locations.active
                    let score2Save = []
                    for (let i = 0; i < war.playingCards.length; i++) {
                        score2Save.push({
                            isWinning: war.playingCards[i].cardsWon.length === war.maxScore ? true : false,
                            gain: 0,
                            locationId: location[0].id,
                            playerId: war.playingCards[i].id
                        })
                    }
                    axios.post("http://localhost:3090/api/add/score/", score2Save)
                        .then(response => {
                            dispatch({
                                type: cst.SET_STATUS,
                                payload: cst.PLAY_END
                            })
                        }).catch(err => console.log("Save Score Error: " + err))
                }
                else {
                    dispatch({
                        type: cst.PLAY_CARDS_DISTRIBUTE,
                        payload: newCards
                    })
                    dispatch({
                        type: cst.SET_STATUS,
                        payload: cst.PLAY_CARDS_DISTRIBUTE,
                    })
                }
            }
            else if (war.status === cst.PLAY_END) {
                dispatch({
                    type: cst.STATUS_SET_NEW_GAME
                })
                dispatch({
                    type: cst.PLAY_CARDS_DISTRIBUTE,
                    payload: newCards
                })
            }
        }
    },

    setResetConfig: () => {
        return dispatch => {
            dispatch({
                type: cst.DEALER_RESET_ACTIVE,
            })

            dispatch({
                type: cst.LOCATION_RESET_ACTIVE,
            })

            dispatch({
                type: cst.PLAYER_RESET_ACTIVE,
            })

            dispatch({
                type: cst.STATUS_SET_NEW_CONFIG
            })
        }
    },

    setReady2Play: (values) => {
        return (dispatch, getState) => {
            dispatch({
                type: cst.LOCATION_SET_ACTIVE,
                payload: values.location
            })

            dispatch({
                type: cst.DEALER_SET_ACTIVE,
                payload: values.dealer
            })

            let obj4loc_dealer = {
                locationId: values.location,
                dealerId: values.dealer
            }

            let playingCards = []
            //first player is always existed (validation of the formular)
            dispatch({
                type: cst.PLAYER_SET_ACTIVE,
                payload: values.player1
            })

            const players = getState().players.all
            let pl = players.filter(p => p.id === values.player1 ? p : null)
            playingCards.push({
                id: values.player1,
                name: pl[0].name,
                cardsWon: [],
                dealerCardId: -1,
                playerCardId: -1
            })

            let obj4loc_player = []
            obj4loc_player.push({
                locationId: values.location,
                playerId: values.player1
            })

            if (values.player2 !== undefined) {
                obj4loc_player.push({
                    locationId: values.location,
                    playerId: values.player2
                })
                dispatch({
                    type: cst.PLAYER_SET_ACTIVE,
                    payload: values.player2
                })
                pl = players.filter(p => p.id === values.player2 ? p : null)
                playingCards.push({
                    id: values.player2,
                    name: pl[0].name,
                    cardsWon: [],
                    dealerCardId: -1,
                    playerCardId: -1
                })
            }

            if (values.player3 !== undefined) {
                obj4loc_player.push({
                    locationId: values.location,
                    playerId: values.player3
                })
                dispatch({
                    type: cst.PLAYER_SET_ACTIVE,
                    payload: values.player3
                })
                pl = players.filter(p => p.id === values.player3 ? p : null)
                playingCards.push({
                    id: values.player3,
                    name: pl[0].name,
                    cardsWon: [],
                    dealerCardId: -1,
                    playerCardId: -1
                })
            }

            if (values.player4 !== undefined) {
                obj4loc_player.push({
                    locationId: values.location,
                    playerId: values.player4
                })
                dispatch({
                    type: cst.PLAYER_SET_ACTIVE,
                    payload: values.player4
                })
                pl = players.filter(p => p.id === values.player4 ? p : null)
                playingCards.push({
                    id: values.player4,
                    name: pl[0].name,
                    cardsWon: [],
                    dealerCardId: -1,
                    playerCardId: -1
                })
            }
            axios.post("http://localhost:3090/api/add/loc_dealer/", obj4loc_dealer)
                .then(respLocDealer => {
                    axios.post("http://localhost:3090/api/add/loc_players/", obj4loc_player)
                        .then(respLocPlayer => {
                            dispatch({
                                type: cst.STATUS_SELECT_PLAYERS,
                                payload: playingCards
                            })
                            let war = getState().war
                            let newCards = getAnAvailableListCard(war)
                            let cards = [...war.playingCards]
                            for (let i = 0; i < cards.length; i++) {
                                cards[i].playerCard = newCards[i].playerCard
                                cards[i].dealerCard = newCards[i].dealerCard
                            }
                            dispatch({
                                type: cst.PLAY_CARDS_DISTRIBUTE,
                                payload: getNewCards(war)
                            })
                        })
                        .catch(err => console.log(JSON.stringify(err, null, 5)))
                }).catch(err => console.log(err))
        }
    },

    getDealers: () => {
        return (dispatch, getState) => {
            const dealers = getState().dealers
            if (dealers.all.length === 0)
                axios.get("http://localhost:3090/api/get/dealers/")
                    .then(response => {
                        dispatch({
                            type: cst.DEALER_GET_ALL,
                            payload: response.data
                        })
                    }).catch(err => console.log("Get Dealers, err: " + err))
        }
    },

    getLocations: () => {
        return (dispatch, getState) => {
            const locations = getState().locations
            if (locations.all.length === 0)
                axios.get("http://localhost:3090/api/get/locations/")
                    .then(response => {
                        dispatch({
                            type: cst.LOCATION_GET_ALL,
                            payload: response.data
                        })
                    }).catch(err => console.log("Get Locations, err: " + err))
        }
    },

    getPlayers: () => {
        return (dispatch, getState) => {
            const players = getState().players
            if (players.all.length === 0)
                axios.get("http://localhost:3090/api/get/players/")
                    .then(response => {
                        dispatch({
                            type: cst.PLAYER_GET_ALL,
                            payload: response.data
                        })
                    }).catch(err => console.log("Get Players, err: " + err))
        }
    },

    addNewDone: () => {
        return dispatch => {
            dispatch({
                type: cst.SET_STATUS,
                payload: cst.STATUS_SET_NEW_GAME
            })
        }
    },

    addNewDealer: (values) => {
        return dispatch => {
            axios.post("http://localhost:3090/api/add/dealer/", { name: values.name })
                .then(response => {
                    dispatch({
                        type: cst.DEALER_ADD_NEW,
                        payload: response.data
                    })
                }).catch(err => console.log("Add new dealer, err: " + err))
        }
    },

    addNewLocation: (values) => {
        return dispatch => {
            axios.post("http://localhost:3090/api/add/location/", { name: values.name, address: values.address })
                .then(response => {
                    dispatch({
                        type: cst.LOCATION_ADD_NEW,
                        payload: response.data
                    })
                }).catch(err => console.log("Add new location, err: " + err))
        }
    },

    addNewPlayer: (values) => {
        return dispatch => {
            axios.post("http://localhost:3090/api/add/player/", { name: values.name })
                .then(response => {
                    dispatch({
                        type: cst.PLAYER_ADD_NEW,
                        payload: response.data
                    })
                }).catch(err => console.log("Add new player, err: " + err))
        }
    }
}

export default warGameActions