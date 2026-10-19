import mascot from "../../assets/Logo/HebbyLogo.png";
import "./Archives.css"
import habitdata from "../../data/habits.js";
import {useState} from "react";

function Archives() {
    const [habits, setHabits] = useState(habitdata);

    function archiveComplete(id) {
        setHabits((pendingHabits) => pendingHabits.map((habit) => habit.id === id ? {...habit, archived:true, archivepending: false} :habit
        )
        )
        console.log(habits);
    }

    function undoArchive(id) {
        setHabits((pendingHabits) => pendingHabits.map((habit) => habit.id === id ? {...habit, archivepending: false} :habit
            )
        )
        console.log(habits);
    }
    return (
        <>
            <main className="archive-page">
                <section className="archive-main-container">
                    <div className="archive-text-container">
                        <article className="archive-heading">
                            <h1>Archived Habits</h1>
                            <p>Build better habits, one day at a time</p>
                        </article>
                    </div>
                    <div className="archive-aside-container">
                        <div className="archive-container"> {/*Function filters and displays only the habits that have been archived*/}
                            {habits.filter((habit) => habit.archivepending === true || habit.archived === true).map((habit) => (
                                <div className={`archive-line ${habit.archivepending ? "archive-pending" : "archive-completed"} `} key={habit.id}>
                                    <div className="habit-info">
                                        <strong>{habit.name}</strong>
                                    </div>

                                    {/*Conditional rendering for if habit is fully archived or pending to be archived*/}
                                    {habit.archivepending && (
                                        <div className="archive-actions">
                                            <button className="archive-finalize-button" onClick={() => archiveComplete(habit.id)}>
                                                Finalize
                                            </button>
                                            <button className="undo-button" onClick={() => undoArchive(habit.id)}>
                                                Undo
                                            </button>
                                        </div>
                                    )}

                                    {habit.archived && (
                                        <div className="archive-actions">
                                            <strong>Archived</strong>
                                        </div>
                                    )}
                                </div>
                            ) )}
                        </div>
                        <aside className="habit-buddy-card">
                            <h2>Hebby says:</h2>
                            <p>
                                "Isn’t it nice to be able look back on a job well done?"
                            </p>
                            <img src={mascot} alt="Habit Buddy second mascot, Hebby(with an 'e')"/>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Archives;