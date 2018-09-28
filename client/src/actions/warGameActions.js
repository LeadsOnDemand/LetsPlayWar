import axios from "axios"

import cst from '../constants/cst'

const warGameActions = {
    playGame: () => {
        return (dispatch, getState) => {
            let dealers = getState().dealers
            let locations = getState().locations
            let players = getState().players

            // We need at least to start a game:
            //      * 1 location
            //      * 1 dealer
            //      * 1 player
            if (locations.all.length === 0) {
                dispatch({
                    type: cst.SET_STATUS,
                    payload: cst.STATUS_LOCATION_ADD
                })
                if (dealers.all.length === 0) {
                    dispatch({
                        type: cst.SET_STATUS,
                        payload: cst.STATUS_DEALER_ADD
                    })
                    if (players.all.length === 0)
                        dispatch({
                            type: cst.SET_STATUS,
                            payload: cst.STATUS_PLAYER_ADD
                        })
                }
            }
            
            //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
        }
    },

    setNewStatus: (newStatus) => {
        return dispatch => dispatch({
            type: cst.SET_STATUS,
            payload: newStatus
        })
    },

    getDealers: () => {
        return dispatch => {
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
        return dispatch => {
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
        return dispatch => {
            axios.get("http://localhost:3090/api/get/players/")
                .then(response => {
                    dispatch({
                        type: cst.PLAYER_GET_ALL,
                        payload: response.data
                    })
                }).catch(err => console.log("Get Players, err: " + err))
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
            axios.post("http://localhost:3090/api/add/location/", { name: values.name })
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