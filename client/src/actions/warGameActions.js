import axios from "axios"

import cst from '../constants/cst'

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
            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            console.log("warGameAction/playGame/war.status: " + war.status)
            if (war.playingCards.length === 0)
                dispatch({
                    type: cst.STATUS_SET_NEW_GAME
                })
            else {
                if (war.round === 0 && war.playingCards[0].dealerCard.id !== undefined)
                    dispatch({
                        type: cst.PLAY_CARDS_DISTRIBUTE
                    })

                if (war.status === cst.PLAY_CARDS_DISTRIBUTE) {
                    dispatch({
                        type: cst.SET_STATUS,
                        payload: cst.PLAY_CARDS_SHOW,
                    })
                }
                else if (war.status === cst.PLAY_CARDS_SHOW) {
                    for (let i = 0; i < war.playingCards.length; i++) {
                        let obj = war.playingCards[i]
                        if (obj.dealerCard.val === obj.playerCard.val)
                            dispatch({
                                type: cst.PLAY_RESULT_TIE,
                                payload: obj.id,
                            })
                        else if (obj.dealerCard.val < obj.playerCard.val)
                            dispatch({
                                type: cst.PLAY_RESULT_PLAYER_WON,
                                payload: obj.id,
                            })
                        else if (obj.dealerCard.val > obj.playerCard.val)
                            dispatch({
                                type: cst.PLAY_RESULT_PLAYER_LOSE,
                                payload: obj.id,
                            })
                    }
                    const dealerCardsNum = war.dealerCards.length
                    if ((dealerCardsNum < war.playingCards.length * 2) || (war.round > 9)) {
                        const location = getState().locations.active[0]

                        let maxScore = -1

                        // get the Max score
                        for (let i = 0; i < war.playingCards.length; i++)
                            if (war.playingCards[i].cardsWon.length > maxScore)
                                maxScore = war.playingCards[i].cardsWon.length

                        let score2Save = []
                        for (let i = 0; i < war.playingCards.length; i++) {
                            // the winners
                            if (war.playingCards[i].cardsWon.length === maxScore)
                                score2Save.push({
                                    isWinning: true,
                                    gain: 0,
                                    locationId: location.id,
                                    playerId: war.playingCards[i].id
                                })
                            // the losers
                            else
                                score2Save.push({
                                    isWinning: false,
                                    gain: 0,
                                    locationId: location.id,
                                    playerId: war.playingCards[i].id
                                })
                        }
                        dispatch({
                            type: cst.PLAY_SET_MAX_SCORE,
                            payload: maxScore
                        })
                        //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
                        console.log("warGameAction/playGame/score2Save: " + JSON.stringify(score2Save, null, 5))
                        axios.post("http://localhost:3090/api/add/score/", score2Save)
                            .then(response => {
                                dispatch({
                                    type: cst.SET_STATUS,
                                    payload: cst.PLAY_CARDS_DISTRIBUTE
                                })
                                dispatch({
                                    type: cst.PLAY_SET_NEW_ROUND
                                })
                            }).catch(err => console.log("Get Dealers, err: " + err))

                    }
                    else
                        dispatch({
                            type: cst.PLAY_CARDS_DISTRIBUTE
                        })
                }
                else if (war.status === cst.PLAY_END) {
                    dispatch({
                        type: cst.STATUS_SET_NEW_GAME
                    })
                }
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
                type: cst.SET_STATUS,
                payload: cst.STATUS_SET_NEW_CONFIG,
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
                dealerCard: {},
                playerCard: {}
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
                    dealerCard: {},
                    playerCard: {}
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
                    dealerCard: {},
                    playerCard: {}
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
                    dealerCard: {},
                    playerCard: {}
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

                            dispatch({
                                type: cst.PLAY_CARDS_DISTRIBUTE
                            })
                            dispatch({ // We could start to play
                                type: cst.SET_STATUS,
                                payload: cst.PLAY_CARDS_DISTRIBUTE
                            })
                        }).catch(err => console.log("Insertion to 'loc_player' failed, err: " + err))
                }).catch(err => console.log("Insertion to 'loc_dealer' failed, err: " + err))
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