import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Define hardcoded username and password
  const hardcodedUsername = "ensolvers";
  const hardcodedPassword = "password123";

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if entered username and password match the hardcoded ones
    if (username === hardcodedUsername && password === hardcodedPassword) {
      onLogin(); // Call the onLogin function passed as a prop to change the state
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="ensolvers" // Add placeholder text here
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="password123" // Add placeholder text here
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
