// see SignupForm.js for comments
import { useState } from "react";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

// LoginForm component for user login
const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });
    const [login, { error }] = useMutation(LOGIN_USER);

    // Handles form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Handles form submission for user login
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            username: "",
            email: "",
            password: "",
        });
    };

    // Render the login form
    return (
        <>
            <form className='form-container' onSubmit={handleFormSubmit}>
                <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                />
                <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                />
                <button className="form-button" type="submit">
                    Submit
                </button>
            </form>
            {error && <div>Login failed</div>}
        </>
    );
};

export default LoginForm;
