import "../Login/Login.css"
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                    email: email,
                    password: password,
                    roles: ["user"],
                },
                {
                    headers: {
                        'novi-education-project-id': '39cb5325-95c1-4319-a258-146625bf33ea'
                    }
                }
            );
            navigate("/");
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }
    return (
        <>
            <main className="login">

                <section className="login-left-section">
                    <div className="login-left-content">
                        <h1>Habit Buddy</h1>

                        <p>
                            The friend you need to get started on your self-improvement
                            journey.
                        </p>
                    </div>
                </section>
                <section className="login-form-section">
                    <div className="login-form-container">
                        <h2>Welcome!</h2>

                        <p className="subtitle-text">Create your Habit Buddy account</p>


                        <form className="login-form" onClick={handleSubmit}>
                            <div className="login-group">
                                <label htmlFor="email">
                                    Enter e-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Example@email.com"
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="login-group">
                                <label htmlFor="password">
                                    Enter Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p>Account already exists. Try using a different email</p>}

                            <button type="submit" className="big-button" onClick={() => navigate("/")} disabled={loading}>Register account</button>
                        </form>

                        <div className="signup-text">
                            <span>Already have an account?</span>
                            <p><Link to="/" >Login!</Link></p>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Register;