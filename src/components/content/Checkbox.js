import React from "react";

export function Checkbox({onChange, id, checked, labelText}) {
    return (
        <div>
            <input type="checkbox" onChange={onChange} id={id} checked={checked} />
            <label htmlFor={id}>{labelText}</label>
        </div>
    );
}