import React from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { renderInputField } from '../common/reduxForm/renderField'
import { connect } from 'react-redux'
import { compose } from 'redux'
import actions from '../actions/warGameActions'

const validate = values => {
    const errors = {}

    if (!values.name) {
        errors.name = "Required"
    }

    if (!values.address) {
        errors.address = "Required"
    }
    return errors
}

class LocationAddComponent extends React.Component {
    constructor(props){
        super(props)
        this.props.getLocations()
    }

    render() {
        const { handleSubmit, invalid, submitting, reset, addNewLocation, locations, addNewDone } = this.props
        return (
            <div className="panel panel-primary">
                <div className="panel-heading"><h3 align="center">Add New Location</h3></div>
                <div className="panel-body">
                    <div style={{ padding: '10px', border: '2px solid black', borderRadius: "10px", boxShadow: "1px 1px gray" }}>
                        <form onSubmit={handleSubmit(addNewLocation)} autoComplete="off">
                            <Field name="name" component={renderInputField} placeholder="Name" /><br />
                            <Field name="address" component={renderInputField} placeholder="Address" /><br />
                            <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={addNewDone}>Done</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                            </p>
                        </form >
                        <br/>
                        {locations.all.length > 0 &&
                            <div className="panel panel-info">
                                <div className="panel-heading"><h2 align="center">Existing Location(s)</h2></div>
                                <div className="panel-body">
                                    <table align="center" border="1" style={{ padding: '20px' }}><tbody>
                                        {locations.all.map((l, index) => 
                                            <tr key={index}><td className="tdInfo">Location #{index + 1}: {l.name}</td></tr>
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
    locations: state.locations,
})

// Reset the form after submission
const afterSubmit = (result, dispatch) =>
    dispatch(reset('addNewLocationForm'));

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'addNewLocationForm',
        validate,
        onSubmitSuccess: afterSubmit
    })
)(LocationAddComponent)