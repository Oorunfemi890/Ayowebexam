import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
  margin-top: 10%;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${props => (props.disabled ? '#ccc' : '#4CAF50')};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#45a049')};
  }
`;

const Message = styled.p`
  color: green;
  font-size: 1.2em;
  margin-top: 20px;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setIsSuccessful(true);
        setTimeout(() => (window.location.href = '/navslink/course.html'), 3000);
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2>SIGN IN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            {...register('username', { required: true })}
            placeholder="Enter your Username"
          />
          {errors.username && <p style={{ color: 'red' }}>Username is required</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Enter your Password"
          />
          {errors.password && <p style={{ color: 'red' }}>Password is required</p>}
        </div>

        <div>
          <input type="checkbox" {...register('privacy', { required: true })} />
          <label>Accept privacy terms and conditions</label>
          {errors.privacy && <p style={{ color: 'red' }}>You must accept the terms</p>}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <Message show={isSuccessful}>Login successful! Redirecting...</Message>
    </Container>
  );
};

export default SignIn;
