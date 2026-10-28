
import "./Home.css"
import {HabitContext} from "../../context/HabitContext.jsx";
import {useContext} from "react";


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
    const { habits } = useContext(HabitContext);
    const completedHabits = habits.filter((habit) => habit.completed).length;
    const totalHabits = habits.length

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
                        <article className="habit-list">
                            {habits.map((habit) => (
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
                            placeholder="Write a few notes here."
                        />
                    </div>
                    <div className="weather-container">
                        <p>Placeholder here comes OpenWeatherApi data</p>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Home;