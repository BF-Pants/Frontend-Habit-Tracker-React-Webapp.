import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "./AuthContext.jsx";

export const HabitContext = createContext({});

function HabitContextProvider({ children }) {
    const { isAuth } = useContext(AuthContext);

    const [habits, setHabits] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getHabits() {
        const token = localStorage.getItem("token");

        if (!token) {
// If statement might be redundant but ensures that when user logs out or someone gets access without authenticating, the state gets reset
            setHabits([]);
            toggleLoading(false);
            return;
        }
        try {
            toggleLoading(true);
            setError(null);

            const response= await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/habits",
                {
                    headers: {
                        'novi-education-project-id': '39cb5325-95c1-4319-a258-146625bf33ea',
                        Authorization: `Bearer ${ token }`,
                    },

                });
            setHabits(response.data);



        } catch (e) {
            console.error("Could not fetch habits:", error)
            setError("Could not load your habits.")
        } finally {
            toggleLoading(false);
        }
    }


    useEffect(() => {
        if (isAuth.isAuth) {
            void getHabits();
        } else {
            setHabits([]);
            toggleLoading(false);

        }
    }, [isAuth.status, isAuth.isAuth, isAuth.user?.id]);


    const data = {
        habits,
        setHabits,
        loading,
        error,
        getHabits,
    };

    return (
        <HabitContext.Provider value={data}>
            {children}
        </HabitContext.Provider>
    );



}
export default HabitContextProvider;