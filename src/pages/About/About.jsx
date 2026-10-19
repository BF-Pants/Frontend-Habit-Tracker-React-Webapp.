import "./About.css"
import Hebby from "../../assets/Logo/HebbyLogo.png"
import Habby from "../../assets/Logo/HabbyLogo.png"
import { Link } from "react-router-dom"

function About() {

    return (
        <>
            <main>
                <section className="about-hero">
                    <div className="about-intro">

                        <h1>Habit Buddy</h1>

                        <p>
                            Habit Buddy is an online habit tracker that lets you add routine to your life!
                            Perfect for short term and long term goals.
                        </p>
                    </div>

                    <section className="about-description-section">
                        <div className="about-description-left">
                            <p>
                                With Habbit Buddy you can add habits and specify them to your exact needs. Leave notes down on the dashboard for those extra little reminders or words of encouragement. With the handy weather forecast system you get the latest weather info straightaway, so you wont be stuck running in the rain.
                            </p>
                        </div>
                        <div className="about-description-right">
                            <p>
                                We at HabitInc. believe that improving one's self should not be done alone, teamwork makes the dream work after all. With that in mind we created a buddy, a Habbit Buddy. Someone that is there to help remind you of the things that are important. Habbit Buddy is maintained by a small group of people in The Netherlands.
                            </p>
                        </div>


                    </section>
                    <div className="about-description-contact">
                        <p>
                            Excited about upcoming new features or have any
                            questions? Tell us by filling in the form on our <Link to="/contact" >contact</Link> page .
                        </p>
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
                </section>
            </main>
        </>
    )
}

export default About;