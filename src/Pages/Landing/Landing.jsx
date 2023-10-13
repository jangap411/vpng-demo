import React from "react";
import "./landing.css";
// import logo from "../../bbgroup.png";//FinCorp-Logo-transparent-bg.png
import logo from "../../FinCorp logo.png"; //
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Partnership from "./Partnership";

const Landing = () => {
  return (
    <>
      <div className="container">
        <div className="introduction">
          <div className="intro-text">
            <h1>Fincorp Credit Portal</h1>
            <h3>Funded by Finance Corporation Limited</h3>
          </div>
          <div className="part">
            <Link to="/login">
              <button className="part-home">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="cover">
          <img src={logo} alt="logo" style={{ width: "90%", height: "60%" }} />
        </div>
      </div>
      {/* <Partnership /> */}
      <Footer />
    </>
  );
};

export default Landing;
