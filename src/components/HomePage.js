import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "../services/firebaseConfig";
import "./Auth.css";

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  
    // Toggle modal visibility
    const toggleModal = () => setShowModal(!showModal);
  
    // Toggle between Login and Signup forms
    const toggleForm = () => setIsLogin(!isLogin);
  
    // Handle user logout
    const handleLogout = () => {
      auth.signOut()
        .then(() => {
          setIsLoggedIn(false);
        })
        .catch((error) => console.error("Logout error:", error));
    };
  
    // Close modal on successful login
    const handleLoginSuccess = () => {
      setShowModal(false);
      setIsLoggedIn(true); 
    };
  
    // Check user authentication state
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <div className="home-container">
        {isLoggedIn ? (
          <button className="login-signup-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-signup-btn" onClick={toggleModal}>
            Login / Signup
          </button>
        )}
  
        <div className="about-section">
          <h1>About Valorant Tracker</h1>
          <p>This project helps Valorant players track their in-game performance, analyze match data, and improve their gameplay.</p>
          <p>Whether you're a casual player or a competitive gamer, this tool provides insights into your strengths and weaknesses.</p>
        </div>
  
        {showModal && !isLoggedIn && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={toggleModal}>×</button>
              <div className="tab-switch">
                <button onClick={() => setIsLogin(true)} className={isLogin ? "active-tab" : ""}>Login</button>
                <button onClick={() => setIsLogin(false)} className={!isLogin ? "active-tab" : ""}>Signup</button>
              </div>
              {isLogin ? (
                <Login onLoginSuccess={handleLoginSuccess} /> // Pass the callback to Login
              ) : (
                <Signup />
              )}
              <button className="toggle-form-btn" onClick={toggleForm}>
                {isLogin ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

export default HomePage;