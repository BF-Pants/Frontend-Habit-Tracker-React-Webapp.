
import "./MyHabits.css"
import habitdata from "../../data/habits.js";
import mascot from "../../assets/Logo/HabbyLogo.png"
import {useState} from "react";
import { useNavigate } from "react-router-dom";

function myHabits(){
    const navigate= useNavigate();
    const [habits, setHabits] = useState(habitdata);
    function toggleHabit(id) {
        setHabits(
            habits.map((habit) =>
                habit.id === id ? { ...habit, completed: !habit.completed } : habit));
    }

    function deleteHabit(id) {
        setHabits(
            habits.filter((habit) => habit.id !== id)
        );
    }

    function archiveHabit(id) {
        setHabits((currentHabits) => currentHabits.map((habit) => habit.id === id ? {...habit, archivepending: true} :habit
            )
        );
    }

    function addHabit() {
        //     const newHabit = {
        //         id: Math.random().toString(),
        //         name: "New habit",
        //         frequency: "Daily",
        //         notes: "",
        //         completed: false,
        //         archivepending: false,
        //         archived: false,
        //     };
        //
        //     setHabits([...habits, newHabit]);
        // }
        navigate("/createhabit")
    }

    function saveHabits() {
        console.log("Saved habits:", habits);
    }


    return (
        <>
            <main className="my-habits-page">
                <section className="my-habits-main-container">
                        <div className="my-habits-text-container">
                            <article className="my-habits-heading">
                                <h1>My Habits</h1>
                                <p>Build better habits, one day at a time</p>
                            </article>
                            <button className="save-button" onClick={saveHabits}>
                                    Save
                            </button>
                        </div>
                        <div className="my-habits-aside-container">
                            <div className="habits-container">
                                {habits.filter((habit) => habit.archivepending === false && habit.archived === false).map((habit) => (
                                    <div className="habit-line" key={habit.id}>
                                        <div className="habit-info">
                                            <strong>{habit.name}</strong>
                                            <span>{habit.frequency}</span>
                                        </div>
                                        <div className="habit-actions">
                                            <input
                                                className="habit-checkbox" type="checkbox" checked={habit.completed}
                                                onChange={() => toggleHabit(habit.id)}
                                            />
                                            <button className="archive-button" onClick={() => archiveHabit(habit.id)}>
                                                Archive
                                            </button>
                                            <button className="delete-button" onClick={() => deleteHabit(habit.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            <div>
                                <button
                                    className="add-habit-button"
                                    onClick={addHabit}
                                >
                                    Add Habit
                                </button>
                            </div>
                            </div>
                            <aside className="habit-buddy-card">
                                <h2>Habby says:</h2>
                                <p>
                                    "A single step is all it
                                    takes. To start on your
                                    journey"
                                </p>
                                <img src={mascot} alt="Habit Buddy mascot, Habby(with an 'a')"/>
                            </aside>
                        </div>
                </section>

            </main>

        </>
    )
}

export default myHabits;