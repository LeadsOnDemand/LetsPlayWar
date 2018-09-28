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

class LocationAddComponent extends React.Component {

    render() {
        const { handleSubmit, invalid, submitting, reset, addNewLocation, locations } = this.props
        return (
            <div className="panel panel-primary">
                <div className="panel-heading"><h1 align="center">Add New Location</h1></div>
                <div className="panel-body">
                    <div style={{ padding: '10px', border: '2px solid black', borderRadius: "10px", boxShadow: "1px 1px gray" }}>
                        <form onSubmit={handleSubmit(addNewLocation)} autoComplete="off">
                            <Field name="name" component={renderInputField} placeholder="name" /><br />
                            <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                            </p>
                        </form >
                        <br/>
                        {locations.all.length > 0 &&
                            <div className="panel panel-info">
                                <div className="panel-heading"><h2>Existing Location(s)</h2></div>
                                <div className="panel-body">
                                    <table align="center" border="1" style={{ padding: '20px' }}><tbody><tr>
                                        {locations.all.map((l, index) => {
                                            <h3>Location #{index + 1}: {l.name}</h3>
                                        })}
                                    </tr></tbody></table>
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