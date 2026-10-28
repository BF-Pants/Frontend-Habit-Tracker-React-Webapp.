
import "./MyHabits.css"
import mascot from "../../assets/Logo/HabbyLogo.png"
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {HabitContext} from "../../context/HabitContext.jsx";


function myHabits(){
    const navigate= useNavigate();

    const { habits, loading, error, toggleHabit, saveHabits, archiveHabit, deleteHabit } = useContext(HabitContext);

    if (loading) {
        return <p> Loading....</p>;
    }

    if (error) {
        return <p> {error}</p>;
    }


    function handleDelete(habitId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this habit?"
        );

        if (confirmed) {
            deleteHabit(habitId);
        }
    }

    function handleArchive(habitId) {
        const confirmed = window.confirm(
            "Are you sure you want to archive this habit?"
        );

        if (confirmed) {
            archiveHabit(habitId);
        }
    }

    function addHabit() {
        navigate("/createhabit")
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

                                {habits.filter((habit) => habit.archivepending === false && habit.archived === false).map((habit) =>(
                                    <div className="habit-line" key={habit.id} >
                                        <div className="habit-info">
                                            <strong>{habit.name}</strong>
                                            <span>{habit.frequency}</span>
                                        </div>
                                        <div className="habit-actions">
                                            <input
                                                className="habit-checkbox" type="checkbox"
                                                checked={habit.completed}
                                                onChange={() => toggleHabit(habit.id)}
                                            />
                                            <button className="archive-button" onClick={() => handleArchive(habit.id)}>
                                                Archive
                                            </button>
                                            <button className="delete-button" onClick={() => handleDelete(habit.id)}>
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