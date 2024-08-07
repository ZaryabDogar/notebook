'use client';
import React, { useCallback, useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
	const host = 'https://note-be-two.vercel.app';
	const [notes, setNotes] = useState([]);
	const [user, setUser] = useState(null);

    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth');
            console.log('Retrieved token:', token); // Debug log
            return token;
        }
        
    };
	const token = getAuthToken();
	if (!token) {
		console.log('Auth token not found');
		
	}

	console.log('Tokenx:', token);
	const getnotes = useCallback(async () => {
		try {
			const response = await fetch(`${host}/api/notes/fetchallnotes`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': token,
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const json = await response.json();
			setNotes(json);
		} catch (error) {
			console.error('Error fetching notes:', error);
		}
	}, []); // Empty array ensures this function is stable
	const addnote = useCallback(
		async (title, description, tag) => {
			try {
				const response = await fetch(`${host}/api/notes/addnote`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'auth-token': getAuthToken(),
					},
					body: JSON.stringify({ title, description, tag }),
				});
				const json = await response.json();
				setNotes(notes.concat(json));
			} catch (error) {
				console.error('Error adding note:', error);
			}
		},
		[notes]
	);
	const editnote = useCallback(
		async (id, title, description, tag) => {
			try {
				const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'auth-token': getAuthToken(),
					},
					body: JSON.stringify({ title, description, tag }),
				});
				let newNotes = [...notes];
				const index = newNotes.findIndex((note) => note._id === id);
				if (index !== -1) {
					newNotes[index] = { ...newNotes[index], title, description, tag };
					setNotes(newNotes);
				}
			} catch (error) {
				console.error('Error editing note:', error);
			}
		},
		[notes]
	);
	const deletenote = useCallback(
		async (id) => {
			try {
				const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'auth-token': getAuthToken(),
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				setNotes(notes.filter((note) => note._id !== id));
			} catch (error) {
				console.error('Error deleting note:', error);
			}
		},
		[notes]
	);
	const getuser = useCallback(async (authtoken) => {
		console.log(authtoken);
		try {
			const response = await fetch(`${host}/api/auth/getuser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': authtoken,
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const json = await response.json();
			setUser(json.user);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	}, []);
	return (
		<noteContext.Provider
			value={{ notes, deletenote, editnote, addnote, getnotes, getuser, user }}
		>
			{props.children}
		</noteContext.Provider>
	);
};
export default NoteState;
