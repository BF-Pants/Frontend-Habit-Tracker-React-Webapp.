import React, {createContext, useContext, useEffect, useState} from 'react';
import {AuthContext} from "./AuthContext.jsx";

export const NotesContext = createContext({});

function NotesContextProvider({ children })  {
    const { isAuth } = useContext(AuthContext);

    const [homeNotes, setHomeNotes] = useState('');
    const userId = isAuth?.user?.userId;
    const defaultNotes = "Write important things here, so you don't forget."
    const localKey = `homeNotes-${userId}`;




    useEffect(() => {
        if (userId == null) {
            setHomeNotes(defaultNotes);
            return;
        }

        const savedNotes = localStorage.getItem(localKey);
        setHomeNotes(savedNotes ?? defaultNotes);
        console.log(homeNotes);
    }, [userId, localKey]);

    async function saveHomeNotes() {
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