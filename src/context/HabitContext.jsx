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
        const userId= isAuth.user?.userId;

        if (userId === null || !token) {
// If statement might be redundant but ensures that when user logs out or someone gets access without authenticating, the state gets reset
            setHabits([]);
            toggleLoading(false);
            console.log("failed to find token and userId");
            return;
        }
        try {
            toggleLoading(true);
            setError(null);

            const response= await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}/habits`,
                {
                    headers: {
                        'novi-education-project-id': '39cb5325-95c1-4319-a258-146625bf33ea',
                        Authorization: `Bearer ${ token }`,
                    },

                });
            console.log(response);

            setHabits(response.data);
            console.log(habits);
            console.log("Success:", response.status);
            console.log("Data:", response.data);


        } catch (e) {
            console.error("Could not fetch habits:", error)
        } finally {
            toggleLoading(false);
        }
    }


    useEffect(() => {
        console.log("use effect launch")

        if (isAuth.status !== 'done') {
            return;
        }

        if (isAuth.isAuth && isAuth.user.userId !== null) {
            console.log("getting habits...");
            void getHabits();
            console.log(isAuth.isAuth);
        } else {
            console.log("Yo dawg it failed")
            setHabits([]);
            toggleLoading(false);

        }
    }, [isAuth.status, isAuth.isAuth, isAuth.user?.userId]);


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