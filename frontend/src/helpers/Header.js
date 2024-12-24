import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import '../styles/Header.css';

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <header class="header">
		<h1 class="logo"><a href="#">ورشة الإشارة الفرعية رقم 4 دجو</a></h1>
      <ul class="main-nav">
          <li class="logo"><Link to="/"><a href="#">مكتب الأفراد</a></Link></li>
          <li class="logo">{user ? <Link to="/login"><a  onClick={logoutUser}>تسجيل خروج</a></Link> : <Link to="/login"><a href="#">تسجيل دخول</a></Link>}</li>
      </ul>
	</header> 

    
  );
};

export default Header;
