import "./Contact.css"
import {useState} from "react";

function Contact () {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contactmessage: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <>
            <section className="contact-hero">
                <h1>Contact information</h1>
                <p>Send letters to:</p>
                <p>Habit Lane 123B 4078XY Netherlands</p>
                <p>Call us on:</p>
                <p>026212345678923</p>
                <p>Or fill in the form below:</p>

            </section>
            <section className="contact-form-section">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name= "firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="First name" />
                    </label>
                    <label>
                        Surname:
                        <input type="text"
                               name= "lastname"
                               value={formData.lastname}
                               onChange={handleChange}
                               placeholder="Last name" />
                    </label>
                    <label>
                        Email:
                        <input type="email"
                               name= "email"
                               value={formData.email}
                               onChange={handleChange}
                               placeholder="Habit@example.com" />
                    </label>
                    <label>
                        Message:
                        <input type="textarea"
                               id="contact-message"
                               name= "contactmessage"
                               value={formData.contactmessage}
                               onChange={handleChange}
                               placeholder="Type your message here" />
                    </label>
                    <button type="submit">Send</button>
                </form>
            </section>
        </>
    )
}

export default Contact