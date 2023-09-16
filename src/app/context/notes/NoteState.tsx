"use client"
import React from "react";
import noteContext from "./noteContext";
const NoteState=(props)=>{
    const state={
        "name":"harry",
        "class":"6b"
    }
    return(<noteContext.Provider value={state}>
        {props.children}
    </noteContext.Provider>)
} 
export default NoteState;