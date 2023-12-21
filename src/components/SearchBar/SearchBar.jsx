import { IoSearchCircleOutline } from "react-icons/io5";
import "./styles.css";
import { useState } from "react";
// import AiOutlineSearch from "react-icons";

const SearchBar = () => {
    const[searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="search-field">
        <span className="search-icon icon">
          <IoSearchCircleOutline/>
        </span>
        <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search......." className="search-box" />
      </div>
    </div>
  );
};

export default SearchBar;
