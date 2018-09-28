import React from 'react'

export const renderInputField = ({ input, placeholder, type, title, meta: { touched, error } }) => (
    <div>
        <label>{placeholder}</label>&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}
        <div>
            <input
                {...input}
                type={type || ""}
                placeholder={placeholder || ""}
                className="form-control"
                title={title}
            />
        </div>
    </div>
)

export const renderTextareaField = ({ input, placeholder, type, rows, cols, title, meta: { touched, error } }) => (
    <div>
        <label>{placeholder}</label>&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}
        <div>
            <textarea
                // VERY IMPORTANT TO PUT "INPUT" LIKE BELOW ...
                {...input}
                type={type || ""}
                placeholder={placeholder || ""}
                className="form-control"
                rows={rows || "3"}
                cols={cols || "40"}
                title={title}
            />
        </div>
    </div>
)

export const renderSelectField = ({ input, placeholder, type, title, meta: { touched, error }, children }) => (
    <div>
        <label>{placeholder}</label>&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}
        <div>
            <select
                // VERY IMPORTANT TO PUT "INPUT" LIKE BELOW ...
                {...input}
                type={type || ""}
                placeholder={placeholder || ""}
                className="form-control"
                title={title}
            >
                {children}
            </select>
        </div>
    </div>
)