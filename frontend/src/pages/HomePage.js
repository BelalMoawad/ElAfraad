import React from "react";
import Card from '../helpers/Card';
import "../styles/HomePage.css";
import { RiUserSearchFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";



const HomePage = () => {
  return (
    <div className="home">
      <div className="card-container">
        <Link to="/search">
          <Card name="بحث" Icon={RiUserSearchFill} />
        </Link>
        <Link to="/add">
          <Card name="إضافة" Icon={FaPlusSquare} />
        </Link>
        <Link to="/filtering/جندي">
          <Card name="جنود" Icon={FaAddressBook} />
        </Link>
        <Link to="/filtering/صف">
          <Card name="ضباط صف" Icon={FaAddressBook} />
        </Link>
        <Link to="/officers">
          <Card name="ضباط" Icon={FaAddressBook} />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
