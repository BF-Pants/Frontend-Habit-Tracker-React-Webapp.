import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "./AuthContext.jsx";


export const HabitContext = createContext({});

function HabitContextProvider({ children }) {
    const { isAuth } = useContext(AuthContext);



    const [habits, setHabits] = useState([]);
    const [originalHabits, setOriginalHabits] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(null);
//--------------------------------------------------------------------------------------------//
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
                        'novi-education-project-id': `${import.meta.env.VITE_NOVI_API_ID}`,
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
//-------------------------------------------------------------------------------------------//
    async function createHabit(newHabitData) {
        const userId = isAuth.user?.userId;
        const token = localStorage.getItem("token");

        if (userId === null || !token) {
            return;
        }

        try {
            const response = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/habits",
                {
                    ...newHabitData,
                    userId: userId,
                },

                {
                    headers: {
                        'novi-education-project-id': `${import.meta.env.VITE_NOVI_API_ID}`,
                        Authorization: `Bearer ${ token }`,
                    },
                }
            );

            setHabits([...habits, response.data])
        } catch (e) {
            console.error("Could not create habit", e);
            throw e;
        }
    }
//--------------------------------------------------------------------------------------//
    async function toggleHabit(habitId) {
        const updatedHabits= habits.map((habit) => {
            if (habit.id === habitId) {
                return {
                    ...habit,
                    completed: !habit.completed,
                };
            }

            return habit;
        });
        setHabits(updatedHabits);
        console.log(updatedHabits);
    }
//--------------------------------------------------------------------------------------//
    async function archiveHabit(habitId) {
        const updatedHabits= habits.map((habit) => {
            if (habit.id === habitId) {
                return {
                    ...habit,
                    archivepending: true,
                };
            }

            return habit;
        });
        setHabits(updatedHabits);

        console.log(updatedHabits);
    }

//--------------------------------------------------------------------------------------//
    async function archiveFinalise(habitId) {
        const updatedHabits= habits.map((habit) => {
            if (habit.id === habitId) {
                return {
                    ...habit,
                    archived: true,
                    archivepending: false,
                };
            }
            return habit
        });
        setHabits(updatedHabits);

        console.log(updatedHabits);
    }
//--------------------------------------------------------------------------------------//
    async function archiveUndo(habitId) {
        const updatedHabits= habits.map((habit) => {
            if (habit.id === habitId) {
                return {
                    ...habit,
                    archived: false, // In order to reliably go back to original state we set archived to false as well.
                    archivepending: false,
                };
            }
            return habit
        });
        setHabits(updatedHabits);

        console.log(updatedHabits);
    }
//--------------------------------------------------------------------------------------//
    async function saveHabits() {
        const token = localStorage.getItem("token");

        const changedHabits = habits.filter((habit) => {
            const originalHabit = originalHabits.find(
                (original) => original.id === habit.id
            );

            if (!originalHabit) return false;

            return Object.keys(habit).some((key) => {
                if (key === 'id' || key === 'userId') return false;

                return habit[key] !== originalHabit[key];
            });
        });

        try {
            for (const habit of changedHabits) {
                await axios.put(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/habits/${habit.id}`,
                    habit,
                    {
                        headers: {
                            'novi-education-project-id': `${import.meta.env.VITE_NOVI_API_ID}`,
                            Authorization: `Bearer ${ token }`,
                        }
                    }
                )
            }
            setOriginalHabits(habits.map((habit) => ({ ...habit })));
            console.log("habits saved:" , habits)
        } catch (e) {
            console.error("Something went wrong", e)
        }
    }
//--------------------------------------------------------------------------------------//
    async function deleteHabit(habitId) {
        const userId = isAuth.user?.userId;
        const token = localStorage.getItem("token");

        if (userId === null || !token) {
            return;
        }
        try {
                await axios.delete(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/habits/${habitId}`,
                    {
                        headers: {
                            'novi-education-project-id': `${import.meta.env.VITE_NOVI_API_ID}`,
                            Authorization: `Bearer ${ token }`,
                        }
                    }
                )
            setHabits(habits.filter((habit) => habit.id !== habitId));
            console.log("habits deleted:" , habits)
        } catch (e) {
            console.error("Something went wrong", e)
        }
    }
//--------------------------------------------------------------------------------------//
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

//-------------------------------------------------------------------------------------//
    const data = {
        habits,
        setHabits,
        loading,
        error,
        toggleHabit,
        getHabits,
        createHabit,
        saveHabits,
        archiveHabit,
        archiveFinalise,
        archiveUndo,
        deleteHabit
    };

    return (
        <HabitContext.Provider value={data}>
            {children}
        </HabitContext.Provider>
    );



}
export default HabitContextProvider;