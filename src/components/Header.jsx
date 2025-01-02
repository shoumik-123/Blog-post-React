import logo from "../assets/synesisit-logo.png";
import "../assets/css/header.css";

const Header = () => {
  return (
    <header className="header">
      <a href="/"><img src={logo} alt="Synesis IT Logo" className="" /></a>
      <div className="header-right">
        <div className="bell-container">
            <span>Bell Counter</span>
          <i className="fas fa-bell"></i>
          <span className="bell-counter">6</span>
        </div>
        <button className="btn sign-in">Sign in</button>
        <button className="btn register">Register</button>

      </div>
    </header>
  );
};

export default Header;
