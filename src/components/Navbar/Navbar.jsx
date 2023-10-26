import { React, useState } from "react";
import "./Navbar.css";
import LinkWithIcon from "./LinkWithIcon";
import rocket from "../../assets/rocket.png";
import products from "../../assets/glowing-star.png";
import login from "../../assets/id-button.png";
import signup from "../../assets/memo.png";
import myorder from "../../assets/package.png";
import logout from "../../assets/locked.png";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
  };

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket}></LinkWithIcon>
        <LinkWithIcon
          title="Products"
          link="/products"
          emoji={products}
        ></LinkWithIcon>
        <LinkWithIcon title="Login" link="/login" emoji={login}></LinkWithIcon>
        <LinkWithIcon
          title="SignUp"
          link="/signup"
          emoji={signup}
        ></LinkWithIcon>
        <LinkWithIcon
          title="My Orders"
          link="/myorder"
          emoji={myorder}
        ></LinkWithIcon>
        <LinkWithIcon
          title="Logout"
          link="/logout"
          emoji={logout}
        ></LinkWithIcon>
        <NavLink to="/cart" className="align_center">
          Cart<p className="align_center cart_counts">0</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
