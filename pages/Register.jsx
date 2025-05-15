// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = existingUsers.find(u => u.email === email);
    if (userExists) {
      alert('⚠️ Użytkownik o tym emailu już istnieje!');
      return;
    }

    const newUser = { email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('✅ Rejestracja zakończona! Możesz się zalogować.');
    navigate('/login');
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <h2>Rejestracja</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Zarejestruj się</button>
    </form>
  );
}

export default Register;
