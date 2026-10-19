
import "./Login.css"
import {Link} from "react-router-dom";
function Login() {

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


                        <form className="login-form">
                            <div className="login-group">
                                <label htmlFor="email">
                                    Enter e-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Example@email.com"
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
                                />
                            </div>
                            <button type="submit" className="big-button">
                                Log in
                            </button>
                        </form>

                        <div className="signup-text">
                            <span>Don't have an account?</span>
                            <p><Link to="/Register" >Sign up!</Link></p>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Login;
