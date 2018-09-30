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
            if (war.playingCards.length === 0)
                dispatch({
                    type: cst.STATUS_SET_NEW_GAME
                })
            // let dealers = getState().dealers
            // let locations = getState().locations
            // let players = getState().players

            // // We need at least to start a game:
            // //      * 1 location
            // //      * 1 dealer
            // //      * 1 player
            // if (locations.all.length === 0)
            //     dispatch({
            //         type: cst.SET_STATUS,
            //         payload: cst.STATUS_LOCATION_ADD
            //     })
            // else if (dealers.all.length === 0)
            //     dispatch({
            //         type: cst.SET_STATUS,
            //         payload: cst.STATUS_DEALER_ADD
            //     })
            // else if (players.all.length === 0)
            //     dispatch({
            //         type: cst.SET_STATUS,
            //         payload: cst.STATUS_PLAYER_ADD
            //     })

            // // if we have condition below, then we could start to play:
            // //      * 1 location
            // //      * 1 dealer
            // //      * 1 to 4 players
            // if (locations.all.length > 0 && dealers.all.length > 0 && players.all.length > 0) {
            //     if (war.playingCards.length === 0)
            //         dispatch({
            //             type: cst.STATUS_SET_NEW_GAME
            //         })
            // }

        }
    },

    setReady2Play: (values) => {
        return dispatch => {
            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
            console.log("warGameActions/setReady2Play/values: " + JSON.stringify(values, null, 5))
        }
    },

    getDealers: () => {
        return (dispatch, getState) => {
            const dealers = getState().dealers
            if (dealers.all.length === 0)
                axios.get("http://localhost:3090/api/get/dealers/")
                    .then(response => {
                        //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
                        console.log("warGAmeActions/getDealers/response: " + JSON.stringify(response, null, 5))
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
                        //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
                        console.log("warGAmeActions/getLocation/response: " + JSON.stringify(response, null, 5))
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
                        //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
                        console.log("warGAmeActions/getPlayers/response: " + JSON.stringify(response, null, 5))
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