// import React from "react";
import Logo from "../../assets/keep_logo.png";
// import SearchBar from "../SearchBar/SearchBar";
import "./styles.css";

function Navbar() {
  const logo = <img src={Logo} alt="logo" />;
  return (
    <div className="header">
      <div style={{display:"flex", alignItems:"center"}}>
        {logo}
        <h1>Keep Clone</h1>
      </div>
      {/* <div>
        {" "}
        <SearchBar />{" "}
      </div> */}
    </div>
  );
}

export default Navbar;
