import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.png";
import basket_icon from "../../assets/basket_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import bag_icon from "../../assets/bag_icon.png";
import logout_icon from "../../assets/logout_icon.png";
import cross_icon from "../../assets/cross_icon.png"; // Import close icon

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // For storing the search query
  const [isSearchVisible, setIsSearchVisible] = useState(false); // For toggling search bar visibility

  const isAuthenticated = () => Boolean(localStorage.getItem("Token"));

  useEffect(() => {
    if (isAuthenticated()) {
      const token = localStorage.getItem("Token");
      const decodedToken = jwtDecode(token);
      setLoggedInUsername(decodedToken.username);
      setShowLogin(false);
    }
  }, [setShowLogin]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("Token");
    setLoggedInUsername("");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/Search?q=${searchQuery}`);
      setIsSearchVisible(false);
    }
  };

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <ul className="menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          <Link to="/about">About</Link>
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="navbar-right">
        {/* Conditional rendering for search icon / close icon */}
        <img
          src={isSearchVisible ? cross_icon : search_icon} // Change icon based on search bar visibility
          alt={isSearchVisible ? "Close" : "Search"}
          className="navbar-search-icon"
          onClick={() => setIsSearchVisible(!isSearchVisible)} // Toggle search bar visibility
        />

        {/* Search Bar */}
        {isSearchVisible && (
          <form onSubmit={handleSearch} className="navbar-search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query as the user types
            />
            <button type="submit">Search</button>
          </form>
        )}

        {/* Basket Icon */}
        <Link to="/cart" className="navbar-cart-icon">
          <img src={basket_icon} alt="Basket" />
          <div className="dot"></div>
        </Link>

        {/* Authenticated User */}
        {!isAuthenticated() ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={profile_icon} alt="" />
            <span className="logged-in-username">{loggedInUsername}</span>
            <ul className="nav-profile-dropdown">
              <li>
                <Link to="/Orders" className="order-link">
                  {" "}
                  {/* Set the path you want to navigate to */}
                  <img src={bag_icon} alt="Orders Icon" />
                  <p>Orders</p>
                </Link>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
