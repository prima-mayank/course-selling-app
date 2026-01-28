import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuth, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              
    navigate("/login");    
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Courses</Link>

        {isAuth && isAdmin && (
          <Link to="/admin">Admin</Link>
        )}
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {!isAuth ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
