import React, {useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
   
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });
   
    const [validated] = useState(false);
  
    const [Alert, setAlert] = useState(false);
  
    const [addUser, { error }] = useMutation(ADD_USER);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userData}
      })
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setAlert(true);
    }

    setUserData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
     
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setAlert(false)} show={Alert} variant='danger'>
        Opps, something went wrong with your login
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter the Username.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter the Username.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter the Password.</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userData.username && userData.email && userData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
