import "../Login/Login.css"
import {Link, NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    function navigateLogin() {
        navigate("/");
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


                        <form className="login-form">
                            <div className="login-group">
                                <label htmlFor="email">
                                    Enter e-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Example@email.com"
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
                                    required
                                />
                            </div>
                            <button type="submit" className="big-button" onClick={navigateLogin}>Register account</button>
                        </form>

                        <div className="signup-text">
                            <span>Already have an account?</span>
                            <p><Link to="/login" >Login!</Link></p>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Register;