import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/warGameActions'
import cst from '../constants/cst'

import PlayersSelected2PlayComponent from '../components/PlayersSelected2PlayComponent'
import DealerAddComponent from '../components/DealerAddComponent'
import LocationAddComponent from '../components/LocationAddComponent'
import PlayerAddComponent from '../components/PlayerAddComponent'

class PlayComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.getPlayers()
    }

    render() {
        const { data, playGame } = this.props
        return (
            <div style={{ padding: '0px 10px' }}>
                <p align='center'><button type="button" onClick={playGame}>Play</button></p>
                {data.status === cst.STATUS_LOCATION_ADD &&
                    <LocationAddComponent />
                }
                {data.status === cst.STATUS_DEALER_ADD &&
                    <DealerAddComponent />
                }
                {data.status === cst.STATUS_PLAYER_ADD &&
                    <PlayerAddComponent />
                }
                {/* {data.status === cst.STATUS_PLAY &&
                    <div>

                    </div>
                }
                {data.status === cst.STATUS_FINISH &&
                    <div>

                    </div>
                }
                {data.status === cst.STATUS_SELECT_PLAYERS &&
                    <div>

                    </div>
                }
                {data.status === cst.STATUS_PLAYER_ADD &&
                    <div>
                        <PlayerAddComponent />
                    </div>
                }
                {data.status === cst.STATUS_SET_NEW_GAME &&
                    <div>

                    </div>
                } */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.war
})

export default connect(mapStateToProps, actions)(PlayComponent)