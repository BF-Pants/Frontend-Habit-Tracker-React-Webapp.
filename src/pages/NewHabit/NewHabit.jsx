import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {HabitContext} from "../../context/HabitContext.jsx";
import "./NewHabit.css"
import Hebby from "../../assets/Logo/HebbyLogo.png"
import Habby from "../../assets/Logo/HabbyLogo.png"

function NewHabit () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [notes, setNotes] = useState("");
    const { createHabit }= useContext(HabitContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const newHabit = {
            name,
            frequency,
            notes,
            completed: false,
            archivepending: false,
            archived: false,
        };
        try {
            await createHabit(newHabit)
            console.log("New habit:", newHabit);
            navigate("/habits");
        } catch (e) {
            console.log("Couldn't create habit", e)
        }




    }
    function handleCancel() {
        navigate("/habits");
    }
    return (
        <>
            <main className="new-habit-page">
                <section className="new-habit-container">
                    <header className="new-habit-header">
                        <h1>New Habit</h1>
                        <p>Build better habits, one day at a time</p>
                    </header>

                    <form id="new-habit-form" className="new-habit-form" onSubmit={handleSubmit}>
                        <div className="new-habit-entry">
                            <label htmlFor="habit-name">
                                Habit name <span className="highlight-warning">*required</span>
                                <input id="habit-name" type="text" placeholder="What is the name of your habit?" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </label>

                            <label htmlFor="habit-frequency">
                                Frequency <span className="highlight-warning">*required</span>
                                <select id="habit-frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
                                    <option value="">Value</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                </select>
                            </label>

                            <label htmlFor="habit-notes">
                                Optional Note
                                <input id="habit-notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                            </label>
                        </div>

                        <div className="habit-mascots">
                            <img
                                src={Habby}
                                alt="Yellow cartoon emoticon mascot character, with wears black sunglasses, named Hebby with an 'e'."
                            />
                            <img
                                src={Hebby}
                                alt="Yellow cartoon emoticon mascot character, with red round glasses on, named Habby with an 'a'."
                            />
                        </div>

                    </form>

                    <div className="new-habit-buttons">
                        <button className="cancel-button" onClick={handleCancel}>Cancel</button>

                        <button type="submit" form="new-habit-form" className="save-button">
                            Add Habit
                        </button>
                    </div>

                </section>
            </main>
        </>


    )
}

export default NewHabit