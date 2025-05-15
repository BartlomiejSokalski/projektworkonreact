import { Link } from 'react-router-dom';

function Navbar({ user, handleLogout }) {
  return (
    <nav className="bg-indigo-500 p-4 text-white flex justify-center gap-4">
      {user ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/products">Produkty</Link>
          <button onClick={handleLogout} className="bg-white text-indigo-500 px-3 py-1 rounded hover:bg-gray-100">
            Wyloguj
          </button>
        </>
      ) : (
        <>
          <Link to="/register">Rejestracja</Link>
          <Link to="/login">Logowanie</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
