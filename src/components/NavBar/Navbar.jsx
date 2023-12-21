import { IoSearchCircleOutline } from "react-icons/io5";
import Logo from "../../assets/keep_logo.png";
import "./styles.css";
import { useState } from "react";

function Navbar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const logo = <img src={Logo} alt="logo" />;
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        {logo}
        <h1>Keep Clone</h1>
      </div>
      <div className="search-field">
        <span className="search-icon icon">
          <IoSearchCircleOutline />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search......."
          className="search-box"
        />
      </div>
    </div>
  );
}

export default Navbar;
