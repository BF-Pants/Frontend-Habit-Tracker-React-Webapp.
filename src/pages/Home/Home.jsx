
import "./Home.css"
import {HabitContext} from "../../context/HabitContext.jsx";
import {NotesContext} from "../../context/NotesContext.jsx";
import {useContext} from "react";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget.jsx";

function ProgressWheel({completed, total}) {
    const percentage = total === 0 ? 0 : Math.round((completed/total) * 100);
/*/ Checks if total number of completed habits is 0. if not calculate percentage of completed habits /*/

    const radius = 95;
    const circumference = 2 * Math.PI * radius;

    const progress = circumference - (percentage / 100) * circumference;

    return  (
        <div className="progress-wheel">
            <svg className= "progress-wheel-svg" viewBox="0 0 220 220" >
                <circle
                    className="empty-progress-wheel"
                    cx="110"
                    cy="110"
                    r={radius}
                /> {/* circle svg that acts as the base for the progress wheel */}

                <circle
                    className="filled-progress-wheel"
                    cx="110"
                    cy="110"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                /> {/* circle svg that gets laid on top of the base when a habit is completed.  */}
            </svg>
        </div>
    )
}

function Home() {

    const { habits, loading } = useContext(HabitContext);

    const { homeNotes, setHomeNotes, saveHomeNotes } = useContext(NotesContext);

    const completedHabits = habits.filter((habit) => habit.archivepending === false && habit.archived === false && habit.completed).length;
    const totalHabits = habits.filter((habit) => habit.archivepending === false && habit.archived === false).length

    return (
        <>
            <main className="home-page">
                {/* Top section */}
                <section className="top-dashboard">
                    <div className="daily-progress-card">
                        <h2>Today's progress</h2>
                        <ProgressWheel
                            completed={completedHabits}
                            total={totalHabits}
                        />
                        <p>
                            {completedHabits}/{totalHabits} habits completed
                        </p>
                    </div>
                    {/* Container that shows the current habits */}
                    <div className="habit-card">
                        <h2>Today's habits</h2>
                        <article className="habit-list"> {/* Filters out habits that have been sent to be archived. */}
                            {loading ? (<p>Loading habits...</p>)
                                :
                                habits.filter((habit) => habit.archivepending === false && habit.archived === false).map((habit) => (
                                <div className={`habit-item ${habit.completed ? 'completed' : ''}`} key={habit.id}>
                                    <span className="habit-name">{habit.name}</span>
                                    <span className="habit-notes">{habit.notes}</span>
                                </div>

                                ))}
                        </article>

                    </div>

                </section>

                {/* Bottom section */}
                <section className="bottom-dashboard">
                    <div className="note-textarea">
                        <h2>Notes</h2>

                        <textarea
                            value={homeNotes}
                            onChange={(e) => {setHomeNotes(e.target.value)}}
                        />
                        <button className="save-button" onClick={saveHomeNotes}>Save notes</button>
                    </div>
                    <div className="weather-container">
                       <WeatherWidget/>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Home;