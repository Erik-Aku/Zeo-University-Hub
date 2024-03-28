// Import necessary hooks and modules from React and Apollo Client
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

// Component for user signup form
const SignupForm = () => {
    // State for user form data
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    // Mutation hook for adding a user
    const [addUser, { error }] = useMutation(ADD_USER);

    // Handle input change and update the corresponding state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Handle form submission for signup
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });

            // Log in user after successful signup
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }

        // Reset user form data
        setUserFormData({
            username: "",
            email: "",
            password: "",
        });
    };

    // Render the signup form
    return (
        <>
            <form className='form-container' onSubmit={handleFormSubmit}>
                <input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={userFormData.username}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    required
                />
                <button className="form-button" type="submit">
                    Submit
                </button>
            </form>
            {error && <div>Sign up failed</div>}
        </>
    );
};

export default SignupForm;
