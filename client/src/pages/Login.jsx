// see SignupForm.js for comments
import { useState } from "react";

import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  //   const [validated] = useState(false);
  //   const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      //   setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

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
