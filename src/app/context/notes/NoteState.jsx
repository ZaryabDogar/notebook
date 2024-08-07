"use client"
import React, { useState, useCallback } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = 'https://note-be-two.vercel.app';
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);

    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth');
        }
        return null;
    };
    const getnotes = useCallback(async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                mode: 'no-cors',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken(),
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
    const addnote = useCallback(async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                mode: 'no-cors',
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
    }, [notes]);
    const editnote = useCallback(async (id, title, description, tag) => {
        try {

            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                mode: 'no-cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken(),
                },
                body: JSON.stringify({ title, description, tag }),
            });
            let newNotes = [...notes];
            const index = newNotes.findIndex(note => note._id === id);
            if (index !== -1) {
                newNotes[index] = { ...newNotes[index], title, description, tag };
                setNotes(newNotes);
            }
        } catch (error) {
            console.error('Error editing note:', error);
        }
    }, [notes]);
    const deletenote = useCallback(async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                mode: 'no-cors',
                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken(),
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }, [notes]);
    const getuser = useCallback(async (authtoken) => {
        mode: 'no-cors',
        console.log(authtoken)
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
        <noteContext.Provider value={{ notes, deletenote, editnote, addnote, getnotes, getuser, user }}>
            {props.children}
        </noteContext.Provider>
    );
};
export default NoteState;