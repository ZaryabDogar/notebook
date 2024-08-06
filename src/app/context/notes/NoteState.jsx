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
  }, []);

  const getuser = useCallback(async (authtoken) => {
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

  // Add other functions (addnote, editnote, deletenote) similarly

  return (
    <noteContext.Provider value={{ notes, getnotes, getuser, user }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
