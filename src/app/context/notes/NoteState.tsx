'use client';
import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
	const host = 'http://localhost:500';
	const s1 = [];
	const [notes, setnotes] = useState(s1);
	const [user, setuser] = useState([])
	//get all notes
	const getnotes = async() => {
    // Api calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					localStorage.getItem('auth'),
			},

		});
		const json = await response.json();
    
    setnotes(json)

	};

	//add note
	const addnote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					localStorage.getItem('auth'),
			},
			body: JSON.stringify({title, description, tag}),
		});
		const json = await response.json();
   
		setnotes(notes.concat(json));
	};
	//edit note
	const editnote = async (id, title, description, tag) => {
		
		//Api Calls
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':localStorage.getItem('auth'),
			},
			body: JSON.stringify({title, description, tag}),
		});
		// const json = await response.json();
		

		// edit on client side
		let newnotes=JSON.parse(JSON.stringify(notes))
		for (let index = 0; index < newnotes.length; index++) {
			const element = newnotes[index];
			if (element._id === id) {
				newnotes[index].title = title;
				newnotes[index].description = description;
				newnotes[index].tag = tag;
				break;
			}
		}
		setnotes(newnotes);
	};
	//delete note
	const deletenote = async(id) => {
    
    //api calls
    //Api Calls
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					localStorage.getItem('auth'),
          
			},
	
		});
		const json = await response.json();
		// console.log(json);
		const newnotes = notes.filter((note) => {
			return note._id != id;
		});
		setnotes(newnotes);
	};
	const getuser= async(authtoken) => {
    
    //api calls
    //Api Calls
		const response = await fetch(`${host}/api/auth/getuser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					authtoken,
          
			},
	
		});
		const json = await response.json();
		// console.log(json);
		setuser(json.user)

	};

	return (
		<noteContext.Provider value={{ notes, deletenote, editnote, addnote,getnotes ,getuser,user}}>
			{props.children}
		</noteContext.Provider>
	);
};
export default NoteState;
