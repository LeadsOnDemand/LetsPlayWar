import React from 'react'

export const renderInputField = ({ input, placeholder, type, title, meta: { touched, error } }) => (
    <div>
        <label>{placeholder}&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}</label>
        <input
            {...input}
            type={type || ""}
            placeholder={placeholder || ""}
            className="form-control"
            title={title}
        />
    </div>
)

export const renderTextareaField = ({ input, placeholder, type, rows, cols, title, meta: { touched, error } }) => (
    <div>
        <label>{placeholder}&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}</label>
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
)

export const renderSelectField = ({ input, placeholder, type, title, meta: { touched, error }, children }) => (
    <div>
        <label>{placeholder}&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}</label>
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
)