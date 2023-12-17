import React, { useState } from 'react';
import axios from 'axios';
/* -------------- IMPORT CSS -------------- */
import './input.css';

function Input() {
  const [password, setPassword] = useState('');
  const [steps, setSteps] = useState(0);
  const [borderColor, setBorderColor] = useState('');

  const handlePasswordChange = async () => {
    const passwordStrength = getPasswordStrength(password);
    setSteps(passwordStrength.steps);
    setBorderColor(passwordStrength.borderColor);

    await axios.post('http://localhost:5000/checkStrength', {
      password,
      steps: passwordStrength.steps
    });
  };

  function getPasswordStrength(password) {
    let steps = 0;
    let borderColor = '';

    if (isStrong(password)) {
      borderColor = "#1FC468";
    } else {
      if (!/[a-z]/.test(password)) {
        steps++;
      }
      if (!/[A-Z]/.test(password)) {
        steps++;
      }
      if (!/\d/.test(password)) {
        steps++;
      }

      for (let i = 0; i < password.length - 2; i++) {
        if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
          steps++;
          break;
        }
      }

      if (password.length < 6) {
        steps += 6 - (password.length + steps);
      } else if (password.length > 20) {
        steps += (password.length + steps) - 20;
      }

      borderColor = steps === 0 ? "#1FC468" : "#EE2328";
    }

    return { steps, borderColor };
  }

  function isStrong(password) {
    return (
      password.length >= 6 &&
      password.length <= 20 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      !/(.)\1\1/.test(password)
    );
  }

  return (
    <div className="password-input">
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        id="password"
        name="password"
        placeholder="Enter your password"
        style={{ borderColor: borderColor }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordChange} className="btn">
        Check Strength
      </button>
      <h3 className='step-counter'>
        <span>{steps}</span> Steps required to make password strong!
      </h3>
    </div>
  );
}

export default Input;
