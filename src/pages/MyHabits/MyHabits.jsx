
import "./MyHabits.css"
import mascot from "../../assets/Logo/HabbyLogo.png"
import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {HabitContext} from "../../context/HabitContext.jsx";


function myHabits(){
    const navigate= useNavigate();

    const { habits, loading, error, toggleHabit, saveHabits, archiveHabit, } = useContext(HabitContext);

    if (loading) {
        return <p> Loading....</p>;
    }

    if (error) {
        return <p> {error}</p>;
    }

    // if (habits.length === 0) {
    //     return <p>No habits have been created. Try creating one!</p>
    // }

    // useEffect(()=>{
    //     const token = localStorage.getItem('token');
    //     async function getHabits(){
    //         try{
    //             await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/habits",
    //                 {
    //                     headers:{
    //                         'novi-education-project-id': '39cb5325-95c1-4319-a258-146625bf33ea',
    //                         Authorization: `Bearer ${token}`,
    //                     }
    //                 },
    //
    //                 );
    //
    //         } catch (e) {
    //             console.error(e)
    //         }
    //     }
    // void getHabits();
    // console.log(isAuth)
    // }, [])




    // const [habits, setHabits] = useState(habitdata);
    // function toggleHabit(id) {
    //         habits.map((habit) =>
    //             habit.id === id ? { ...habit, completed: !habit.completed } : habit);
    // }
    //
    function deleteHabit() {
        console.log("test")
        // setHabits(
        //     habits.filter((habit) => habit.id !== id)

    }

    // function archiveHabit() {
    //     console.log("test")
    //     toggleHabit()
    // }

    function addHabit() {
        navigate("/createhabit")
    }
    //
    // function saveHabits() {
    //     console.log("Saved habits:");
    // }


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
                                            <button className="archive-button" onClick={() => archiveHabit(habit.id)}>
                                                Archive
                                            </button>
                                            <button className="delete-button" onClick={() => deleteHabit()}>
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