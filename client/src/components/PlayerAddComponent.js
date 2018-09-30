import React from 'react'
import { reduxForm, Field, FieldArray, reset } from 'redux-form'
import { renderInputField } from '../common/reduxForm/renderField'
import { connect } from 'react-redux'
import { compose } from 'redux'
import actions from '../actions/warGameActions'

const validate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Required"
    }
    return errors
}

class PlayerAddComponent extends React.Component {
    constructor(props){
        super(props)
        this.props.getPlayers()
    }

    render() {
        const { handleSubmit, invalid, submitting, reset, addNewPlayer, players, addNewDone } = this.props
        return (
            <div className="panel panel-primary">
                <div className="panel-heading"><h1 align="center">Add New Player</h1></div>
                <div className="panel-body">
                    <div style={{ padding: '10px', border: '2px solid black', borderRadius: "10px", boxShadow: "1px 1px gray" }}>
                        <form onSubmit={handleSubmit(addNewPlayer)} autoComplete="off">
                            <Field name="name" component={renderInputField} placeholder="Name" /><br />
                            <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={addNewDone}>Done</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                            </p>
                        </form >
                        <br/>
                        {players.all.length > 0 &&
                            <div className="panel panel-info">
                                <div className="panel-heading"><h2 align="center">Existing Player(s)</h2></div>
                                <div className="panel-body">
                                    <table align="center" border="1" style={{ padding: '20px' }}><tbody>
                                        {players.all.map((p, index) => 
                                            <tr key={index}><td className="tdInfo">Player #{index + 1}: {p.name}</td></tr>
                                        )}
                                    </tbody></table>
                                </div>
                            </div>
                        }
                    </div>
                    <br />
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    players: state.players,
})

// Reset the form after submission
const afterSubmit = (result, dispatch) =>
    dispatch(reset('addNewPlayerForm'));

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'addNewPlayerForm',
        validate,
        onSubmitSuccess: afterSubmit
    })
)(PlayerAddComponent)