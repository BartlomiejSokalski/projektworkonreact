// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      login(foundUser); // zapis do AuthContext
      alert('✅ Logowanie udane!');
      navigate('/');
    } else {
      alert('❌ Niepoprawny email lub hasło.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Logowanie</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Zaloguj się</button>
    </form>
  );
}

export default Login;
