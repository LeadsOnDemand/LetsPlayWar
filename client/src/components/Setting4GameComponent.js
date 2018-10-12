import React from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import actions from '../actions/warGameActions'
import cst from '../constants/cst'
import('../index.css');

const validate = values => {
    const errors = {}

    if (!values.location || !values.location.length) {
        errors.location = "Require"
    }
    if (!values.dealer || !values.dealer.length) {
        errors.dealer = "Require"
    }
    if (!values.player1 || !values.player1.length) {
        errors.player1 = "At least a player to start the game!"
    }
    return errors
}

const renderSelectField = ({ input, placeholder, type, title, meta: { touched, error }, children }) => (
    <div>
        <label>{placeholder}</label>
        <div>
            <select
                {...input}
                type={type || ""}
                placeholder={placeholder || ""}
                className="form-control"
                title={title}
            >
                {children}
            </select>
            {error && <span>(<font color="red">{error}</font>)</span>}
        </div>
    </div>
)

class Setting4GameComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.getPlayers()
        this.props.getLocations()
        this.props.getDealers()
    }


    render() {
        const { handleSubmit, invalid, submitting, reset, players, p1, p2, p3, setReady2Play, locations, dealers, setStatus } = this.props
        return (
            <div>
                <div style={{ padding: '10px', border: '2px solid black', borderRadius: "15px", boxShadow: "1px 1px gray" }}>
                    <form onSubmit={handleSubmit(setReady2Play)} autoComplete="off">
                        <Field name="location" component={renderSelectField} placeholder="Location" className="form-control">
                            <option key={0} value="">[Select a Location]</option>
                            {locations.all.map(l =>
                                <option key={l.id} value={l.id}>{l.name} ({l.address})</option>
                            )}
                        </Field>
                        <span className="spanAdd" onClick={e => setStatus(cst.STATUS_LOCATION_ADD)}>Add More Location</span><br /><br />

                        <Field name="dealer" component={renderSelectField} placeholder="Dealer" className="form-control">
                            <option key={0} value="">[Select a Dealer]</option>
                            {dealers.all.map(d =>
                                <option key={d.id} value={d.id}>{d.name}</option>
                            )}
                        </Field>
                        <span className="spanAdd" type="button" onClick={e => setStatus(cst.STATUS_DEALER_ADD)}>Add More Dealer</span><br /><br />

                        <Field name="player1" component={renderSelectField} placeholder="Player #1" className="form-control">
                            <option key={0} value="">[Select at Least a Player]</option>
                            {players.all.map(p =>
                                <option key={p.id} value={p.id}>{p.name}</option>
                            )}
                        </Field>
                        {p1 !== undefined && p1.length > 0 && players.all.length > 1 &&
                            <div>
                                <br/>
                                <Field name="player2" component={renderSelectField} placeholder="Player #2 (Optional)" className="form-control">
                                    <option key={0} value="">[Select the Second Player]</option>
                                    {players.all.map(p => p.id !== p1 ? <option key={p.id} value={p.id}>{p.name}</option> : null)}
                                </Field>
                                {p2 !== undefined && p2.length > 0 && players.all.length > 2 &&
                                    <div>
                                    <br/>
                                        <Field name="player3" component={renderSelectField} placeholder="Player #3 (Optional)" className="form-control">
                                            <option key={0} value="">[Select the Third Player]</option>
                                            {players.all.map(p => p.id !== p1 && p.id !== p2 ? <option key={p.id} value={p.id}>{p.name}</option> : null)}
                                        </Field>

                                        {p3 !== undefined && p3.length > 0 && players.all.length > 3 &&
                                            <div>
                                            <br/>
                                                <Field name="player4" component={renderSelectField} placeholder="Player #4 (Optional)" className="form-control">
                                                    <option key={0} value="">[Select the Last Player]</option>
                                                    {players.all.map(p => (p.id !== p1) && (p.id !== p2) && (p.id !== p3) ? <option key={p.id} value={p.id}>{p.name}</option> : null)}
                                                </Field>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                        <span className="spanAdd" onClick={e => setStatus(cst.STATUS_PLAYER_ADD)}>Add More Player</span>
                        <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Play</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                        </p>
                    </form >
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dealers: state.dealers,
    locations: state.locations,
    players: state.players,
})

// Decorate with connect to read form values
const selector = formValueSelector('selectPlayerForm') // <-- same as form name

Setting4GameComponent = connect(
    state => {
        let p1 = selector(state, "player1")
        let p2 = selector(state, "player2")
        let p3 = selector(state, "player3")

        return { p1, p2, p3 }
    })(Setting4GameComponent)

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'selectPlayerForm',
        validate,
    })
)(Setting4GameComponent)