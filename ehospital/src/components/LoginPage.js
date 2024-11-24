// src/components/LoginPage.js
import React, { useState } from 'react';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Example login check (You can replace with actual logic)
    if (username === 'user' && password === 'password') {
      // If login is successful, call onLoginSuccess
      onLoginSuccess(); 
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
