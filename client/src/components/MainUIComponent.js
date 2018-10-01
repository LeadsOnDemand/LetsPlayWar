import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/warGameActions'
import cst from '../constants/cst'

import Setting4GameComponent from './Setting4GameComponent'
import DealerAddComponent from './DealerAddComponent'
import LocationAddComponent from './LocationAddComponent'
import PlayerAddComponent from './PlayerAddComponent'
import PlayComponent from './PlayComponent'

import('../index.css');

class MainUIComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.getPlayers()
        this.props.getLocations()
        this.props.getDealers()
    }

    render() {
        const { data } = this.props
        return (
            <div style={{ padding: '0px 10px', width: '80%', margin: 'auto' }}>
                <div className="divHeader">Let's Play War</div>
                {data.status === cst.STATUS_LOCATION_ADD &&
                    <LocationAddComponent />
                }
                {data.status === cst.STATUS_DEALER_ADD &&
                    <DealerAddComponent />
                }
                {data.status === cst.STATUS_PLAYER_ADD &&
                    <PlayerAddComponent />
                }
                {(data.status === cst.STATUS_SET_NEW_GAME || data.status === cst.STATUS_SET_NEW_CONFIG) &&
                    <Setting4GameComponent />
                }
                {data.status !== cst.STATUS_LOCATION_ADD && data.status !== cst.STATUS_DEALER_ADD && 
                    data.status !== cst.STATUS_PLAYER_ADD && data.status !== cst.STATUS_SET_NEW_GAME &&
                    data.status !== cst.STATUS_SET_NEW_CONFIG &&
                    <PlayComponent />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.war
})

export default connect(mapStateToProps, actions)(MainUIComponent)