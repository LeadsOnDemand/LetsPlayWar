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

class DealerAddComponent extends React.Component {
    constructor(props){
        super(props)
        this.props.getDealers()
    }

    render() {
        const { handleSubmit, invalid, submitting, reset, addNewDealer, dealers, addNewDone } = this.props
        return (
            <div className="panel panel-primary">
                <div className="panel-heading"><h1 align="center">Add New Dealer</h1></div>
                <div className="panel-body">
                    <div style={{ padding: '10px', border: '2px solid black', borderRadius: "10px", boxShadow: "1px 1px gray" }}>
                        <form onSubmit={handleSubmit(addNewDealer)} autoComplete="off">
                            <Field name="name" component={renderInputField} placeholder="Name" /><br />
                            <p align="center"><button type="submit" className="btn" disabled={invalid || submitting}>Submit</button>&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={addNewDone}>Done</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn" disabled={submitting} onClick={reset}>Clear Values</button>
                            </p>
                        </form >
                        <br />
                        {dealers.all.length > 0 &&
                            <div className="panel panel-info">
                                <div className="panel-heading"><h2 align="center">Existing Location(s)</h2></div>
                                <div className="panel-body">
                                    <table align="center" border="1" style={{ padding: '20px' }}><tbody>
                                        {dealers.all.map((d, index) => 
                                            <tr key={index}><td className="tdInfo">Dealer #{index + 1}: {d.name}</td></tr>
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
    dealers: state.dealers,
})

// Reset the form after submission
const afterSubmit = (result, dispatch) =>
    dispatch(reset('addNewDealerForm'));

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'addNewDealerForm',
        validate,
        onSubmitSuccess: afterSubmit
    })
)(DealerAddComponent)