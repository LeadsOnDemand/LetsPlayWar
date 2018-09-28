import React from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import actions from '../actions/warGameActions'

const validate = values => {
    const errors = {}

    if (!values.player1) {
        errors.player1 = "At least one player to start the game!"
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

class PlayersSelected2PlayComponent extends React.Component {

    render() {
        const { handleSubmit, invalid, submitting, reset, players, p1, p2, p3, selectPlayers } = this.props
        return (
            <div>
                {players.length &&
                    <div style={{ padding: '10px', border: '2px solid black', borderRadius: "15px", boxShadow: "1px 1px gray" }}>
                        <form onSubmit={handleSubmit(selectPlayers)} autoComplete="off">
                            <Field name="player1" component={renderSelectField} placeholder="First Player" className="form-control">
                                {players.map(p => {
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                })}
                            </Field><br />
                            {p1 !== undefined &&
                                <div>
                                    <Field name="player2" component={renderSelectField} placeholder="Second Player" className="form-control">
                                        {players.map(p => {
                                            {
                                                p.id !== p1 &&
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                            }
                                        })}
                                    </Field> <br />
                                    {p2 !== undefined &&
                                        <div>
                                            <Field name="player3" component={renderSelectField} placeholder="Second Player" className="form-control">
                                                {players.map(p => {
                                                    {
                                                        p.id !== p1 && p.id !== p2 &&
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                    }
                                                })}
                                            </Field> <br />

                                            {p3 !== undefined &&
                                                <div>
                                                    <Field name="player3" component={renderSelectField} placeholder="Second Player" className="form-control">
                                                        {players.map(p => {
                                                            {
                                                                p.id !== p1 && p.id !== p2 && p.id !== p3 &&
                                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                            }
                                                        })}
                                                    </Field> <br />
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                            <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                            </p>
                        </form >
                    </div >
                }
            </div>
        )
    }
}

const showAllPlayers = (state) => {
    console.log("PlayersSelected2PlayComponent/players: " + JSON.stringify(state.war.allPlayers, null, 5))
    return state.war.allPlayers
}

const mapStateToProps = (state) => ({
    players: showAllPlayers(state)//state.war.allPlayers
})

// Decorate with connect to read form values
const selector = formValueSelector('selectPlayerForm') // <-- same as form name

PlayersSelected2PlayComponent = connect(
    state => {
        let p1 = selector(state, "player1")
        let p2 = selector(state, "player2")
        let p3 = selector(state, "player3")

        return { p1, p2, p3 }
    })(PlayersSelected2PlayComponent)

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'selectPlayerForm',
        validate,
    })
)(PlayersSelected2PlayComponent)