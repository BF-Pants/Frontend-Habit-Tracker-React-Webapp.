import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "./AuthContext.jsx";

export const NotesContext = createContext({});

function NotesContextProvider({ children })  {
    const { isAuth } = useContext(AuthContext);

    const [homeNotes, setHomeNotes] = useState('Write any important notes here to remind you later.');
    const userId = isAuth?.user?.userId;
    const localKey = `homeNotes-${userId}`;




    useEffect(() => {
        if (userId == null) return;

        const savedNotes = localStorage.getItem(localKey);
        setHomeNotes(savedNotes ?? '');
    }, [localKey]);

    function saveHomeNotes() {
        if (userId == null) return;

        localStorage.setItem(localKey, homeNotes);
    }


    const data = {
        homeNotes,
        setHomeNotes,
        saveHomeNotes
    };

    return (
        <NotesContext.Provider value={data}>
            {children}
        </NotesContext.Provider>
    )

}
export default NotesContextProvider;