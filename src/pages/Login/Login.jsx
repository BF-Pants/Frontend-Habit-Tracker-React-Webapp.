
import "./Login.css"
import {Link} from "react-router-dom";
import {AuthContext} from "/src/context/AuthContext.jsx";
import {useContext, useState} from "react";
import axios from "axios";

function Login() {

    const { login } = useContext(AuthContext);
    const [error, toggleError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login' , {
                    email: email,
                    password: password,
                },
            )
            login(response.data)
        } catch (e) {
            console.error(e);
            toggleError(true);

        }
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
                        <h2>Welcome Back!</h2>

                        <p className="subtitle-text">Log into your Habit Buddy account</p>


                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="login-group">
                                <label htmlFor="email">
                                    Enter e-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="login-group">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error && <p>De gegeven e-mail of wachtwoord is onjuist</p>}
                            </div>
                            <button type="submit" className="big-button">
                                Log in
                            </button>
                        </form>

                        <div className="signup-text">
                            <span>Don't have an account?</span>
                            <p><Link to="/register" >Sign up!</Link></p>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Login;
