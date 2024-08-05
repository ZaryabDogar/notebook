'use client';
import React, { useState, useEffect } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = 'https://note-be-two.vercel.app';
    const [notes, setnotes] = useState([]);
    const [user, setuser] = useState([]);

    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth');
        }
        return null;
    };

    const getnotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
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
            setnotes(json);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': getAuthToken(),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        setnotes(notes.concat(json));
    };

    const editnote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': getAuthToken(),
            },
            body: JSON.stringify({ title, description, tag }),
        });

        let newnotes = JSON.parse(JSON.stringify(notes));
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

    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': getAuthToken(),
            },
        });
        const json = await response.json();
        const newnotes = notes.filter((note) => {
            return note._id !== id;
        });
        setnotes(newnotes);
    };

    const getuser = async (authtoken) => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken,
            },
        });
        const json = await response.json();
        setuser(json.user);
    };

    return (
        <noteContext.Provider value={{ notes, deletenote, editnote, addnote, getnotes, getuser, user }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
