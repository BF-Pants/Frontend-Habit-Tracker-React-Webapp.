import React, {createContext, useContext, useEffect, useState} from 'react';
import {AuthContext} from "./AuthContext.jsx";
import {getHabitsApi, saveHabitsApi, deleteHabitApi, createHabitApi} from "../api/habitApi.js";

export const HabitContext = createContext({});
const token = localStorage.getItem('token');
function HabitContextProvider({ children }) {
    const { isAuth } = useContext(AuthContext);

    const [habits, setHabits] = useState([]);
    const [originalHabits, setOriginalHabits] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [error, setError] = useState(null);
//--------------------------------------------------------------------------------------------//
    async function getHabits() {

        const userId= isAuth.user?.userId;
        toggleLoading(true);

        if (userId == null || !localStorage.getItem("token")) {

// If statement might be redundant but ensures that when user logs out or someone gets access without authenticating, the state gets reset
            setHabits([]);
            toggleLoading(false);
            return;
        }
        try {
            setError(null);

            const userData= await getHabitsApi(userId);

            setHabits(userData);
            setOriginalHabits(userData.map(habit => ({ ...habit })));


        } catch (e) {
            console.error("Could not fetch habits:", e);
        } finally {
            toggleLoading(false);
        }
    }
//-------------------------------------------------------------------------------------------//
    async function createHabit(newHabitData) {
        const userId = isAuth.user?.userId;

        if (userId === null || !token) {
            return;
        }

        try {
            const newHabit= await createHabitApi(newHabitData, userId);

            setHabits(prevHabits =>[...prevHabits, newHabit])
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

    }
//--------------------------------------------------------------------------------------//
    async function saveHabits() {
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
                await saveHabitsApi(habit.id,
                    habit,
                );
            }
            setOriginalHabits(habits.map((habit) => ({ ...habit })));
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
            await deleteHabitApi(habitId);

            setHabits(habits.filter((habit) => habit.id !== habitId));

        } catch (e) {
            console.error("Something went wrong", e)
        }
    }
//--------------------------------------------------------------------------------------//
    useEffect(() => {


        if (isAuth.status !== 'done') {
            console.log("waiting for auth")
            return;
        }

        if (isAuth.isAuth && isAuth.user?.userId != null) {

            void getHabits();
        } else {
            setHabits([]);
            setOriginalHabits([])
            toggleLoading(false);

        }
    }, [isAuth.status, isAuth.isAuth, isAuth.user?.userId, token]);

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