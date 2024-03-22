import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  // set state for form validation
    // const [validated] = useState(false);
  // set state for alert
    // const [showAlert, setShowAlert] = useState(false);

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
      console.log(userFormData);
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
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
      <form onSubmit={handleFormSubmit}>
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
