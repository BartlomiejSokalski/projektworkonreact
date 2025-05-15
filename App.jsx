// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import './App.css';
import Cart from './pages/Cart';

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <nav className="navbar">
        {isAuthenticated ? (
          <>
            <Link to="/cart" className="nav-link">Koszyk</Link>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Produkty</Link>
            <button onClick={logout} className="nav-button">Wyloguj</button>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">Rejestracja</Link>
            <Link to="/login" className="nav-link">Logowanie</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
