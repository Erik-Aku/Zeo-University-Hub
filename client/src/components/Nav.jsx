import { Link } from "react-router-dom";
import Auth from "../utils/auth";
// import { Navbar, Nav, Container} from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <>
      <header className="header-zeo">
        <img
          id="profilepic"
          src="./Assets/images/profile pic.png"
          alt="profilePicture"
          width="10%"
          height="10%"
        />

        <h1>Zeo University Hub</h1>
        <nav className='nav-bar'>
          <Link to="/">
            <h3>
              <b>Home</b>
            </h3>
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="/saved">Saved Colleges</Link>
              <Link onClick={Auth.logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <h3>
                  <b>Login</b>
                </h3>
              </Link>
              <Link to="/signup">
                <h3>
                  <b>Signup</b>
                </h3>
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default AppNavbar;
