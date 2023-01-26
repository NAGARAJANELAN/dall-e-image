import React from "react";
import './FormField.css'

const FormField=(props)=>{
    return(
        <>
            <input className="input-field" placeholder="Type something for DALL-E to draw" size="50" type="text" name="prompt" onChange={props.chng}/>
        </>
    )
}

export default FormField;