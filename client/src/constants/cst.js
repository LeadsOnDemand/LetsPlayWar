const constants = {
    HEARTS: "hearts", 
    CLUBS: "clubs",
    SPADES: "spades", 
    DIAMS: "diams",

    STATUS_SELECT_PLAYERS: "status_select_players",

    STATUS_DEALER_ADD: "status_dealer_add",
    STATUS_LOCATION_ADD: "status_location_add",
    STATUS_PLAYER_ADD: "status_player_add",

    // get: location, dealer, players
    STATUS_SET_NEW_CONFIG: "status_set_new_config",
    // with same: location, dealer and players
    STATUS_SET_NEW_GAME: "status_set_new_game",
    STATUS_SET_NEW_ROUND: "status_set_new_round",
    STATUS_SET_FIRST_ROUND: "status_set_first_round",
    SET_STATUS: "set_status",

    PLAY_CARDS_SHOW: "play_cards_show",
    PLAY_SET_CARDS_SHOW: "play_set_cards_show",
    PLAY_CARDS_DISTRIBUTE: "play_cards_distribute",
    PLAY_END: "play_end",
    PLAY_SET_END: "play_set_end",

    DEALER_ADD_NEW: "dealer_add_new",
    // Get all from the DB
    DEALER_GET_ALL: "dealer_get_all",
    DEALER_SET_ACTIVE: "dealer_set_active",
    DEALER_RESET_ACTIVE: "dealer_reset_active",

    LOCATION_ADD_NEW: "location_add_new",
    // Get all from the DB
    LOCATION_GET_ALL: "location_get_all",
    LOCATION_SET_ACTIVE: "location_set_active",
    LOCATION_RESET_ACTIVE: "location_reset_active",


    PLAYER_ADD_NEW: "player_add_new",
    // Get all from the DB
    PLAYER_GET_ALL: "player_get_all",
    PLAYER_SET_ACTIVE: "players_set_active",
    PLAYER_RESET_ACTIVE: "players_reset_active",
    PLAYERS_4_NEW_GAME: "players_4_new_game",
    
    CARD_AVAILABLE: 0,
    CARD_TAKEN_TEMPO: 1,
    CARD_TAKEN_BY_PLAYERS: 2
}

export default constants