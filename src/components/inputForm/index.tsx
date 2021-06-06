import React, { CSSProperties } from 'react'
import './inputForm.css'
interface Props {
    placeholder?: string;
    style?: CSSProperties;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string | number;
    type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"
}
export const InputForm = ({placeholder, style, onChange, value, type="text"}:Props) => {
    return (
        <div className="container-input">
            <input className="input-form" type={type} placeholder={placeholder} style={style} onChange={onChange} value={value}/>
        </div>
    )
}