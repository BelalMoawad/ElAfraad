import React from 'react';
import { Link } from "react-router-dom";
import Card from '../helpers/Card';
import "../styles/HomePage.css";
import { RiUserSearchFill } from "react-icons/ri";

const Search = () => {
  return (
    <div className="home">
      <div className="card-container">
        <Link to="/search/name">
          <Card name="بحث بالإسم" Icon={RiUserSearchFill} />
        </Link>
        <Link to="/search/exit_from_army_date">
          <Card name="بحث بتاريخ التسريح" Icon={RiUserSearchFill} />
        </Link>
        <Link to="/search/entering_army_date">
          <Card name="بحث بتاريخ الضم" Icon={RiUserSearchFill} />
        </Link>
        <Link to="/search/militray_number">
          <Card name="بحث بالرقم العسكري" Icon={RiUserSearchFill} />
        </Link> 
      </div>
    </div>
  )
}


export default Search;