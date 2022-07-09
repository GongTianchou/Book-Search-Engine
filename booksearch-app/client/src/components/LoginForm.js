import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setAlert(false)}
          show={showAlert}
          variant="outline-danger"
        >
          Opps, something went wrong with your login
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter the Email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter the password
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userData.email && userData.password)}
          type="submit"
          variant="outline-success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
