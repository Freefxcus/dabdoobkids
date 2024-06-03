import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import styles from "../styles/components/Header.module.css";
import logo from "../images/logo.svg";
import gift from "../images/gift.svg";
import baby1 from "../images/baby1.svg";
import baby2 from "../images/baby2.svg";
import email from "../images/email.svg";
import phone from "../images/phone.svg";
import lense from "../images/lense.svg";
import heart from "../images/heart.svg";
import brownHeart from "../images/brown-heart.svg";
import bag from "../images/bag.svg";
import brownBag from "../images/brown-bag.svg";
import user from "../images/user.svg";
import dabdoob from "../images/dabdoob.svg";
import burger from "../images/burger.png";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "../Redux/store";
import { getCategories, getSubCategories } from "../utils/apiCalls";
export default function Header({ setOpen }) {
  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      if (value) {
        navigate(`search/?query=${value}`);
      }
    }, 2000),
    []
  );
  const wishlist = useSelector((state) => state.wishlist.value);
  const cart = useSelector((state) => state.cart.value);
  const [dropDownType, setDropDownType] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sidebar, setSidebar] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const myInputRef = useRef("");
  const navigate = useNavigate();

  const [animation, setAnimation] = useState(false);
  // For the first useEffect
  useEffect(() => {
    const animationTimeoutId = setTimeout(() => {
      setAnimation(true);
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      clearTimeout(animationTimeoutId);
    };
  }, []);

  // For the second useEffect
  useEffect(() => {
    const searchInputTimeoutId = setTimeout(() => {
      if (!myInputRef.current) {
        setSearchInput(false);
      }
    }, 4000);

    // Cleanup function to clear the timeout when searchInput or searchInputValue changes
    return () => {
      clearTimeout(searchInputTimeoutId);
    };
  }, [searchInput, searchInputValue]);

  const [state, setState] = React.useState(false);
  const toggleDrawer = () => {
    setState((prev) => !prev);
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsUser(true);
    }
  }, [localStorage.getItem("access_token")]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
    getSubCategories().then((res) => {
      setSubCategories(res);
    });
  }, []);
  console.log(subCategories, "categories123123123");
  return (
    <>
      {/* 1st bar */}
      <div
        className="padding-container"
        style={{
          backgroundColor: "var(--brown)",
          color: "var(--white)",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            height: "100%",
          }}
        >
          <div className={styles["sub-container"]}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img src={email} />
              <div>blabla@gmail.com</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img src={phone} />
              <div>099-88293-03</div>
            </div>
          </div>
        </div>
      </div>
      {/* 2st bar */}
      <div
        className="padding-container"
        style={{ backgroundColor: "var(--off-white)" }}
      >
        <div
          style={{
            justifyContent: "space-between",
            paddingTop: 0,
            paddingBottom: 0,
          }}
          className={`${styles.container}`}
        >
          <div className={styles["sub-container"]}>
            <img
              src={logo}
              className={styles.logo}
              onClick={() => {
                navigate("/");
              }}
            />

            {categories &&
              categories?.categories?.map((category) => (
                <Dropdown
                  title={category?.name}
                  items={[{ title: "First", link: "#" }]}
                  dropDown={dropDown}
                  setDropDown={setDropDown}
                  setDropDownType={setDropDownType}
                />
              ))}
          </div>
          {/* <div className={styles["sub-container"]}> */}
          <div
            className={styles["sub-container"]}
            // style={{ gap: 0, overflow: "hidden" }}
            style={{ gap: 0 }}
          >
            <img
              src={dabdoob}
              className={`${styles.clickable} hidden-on-small-screen`}
              style={{
                marginLeft: "10px",
                position: "relative",
                left: animation ? 0 : "160px",
                transition: "left 1s ease-in-out",
              }}
              onClick={() => {}}
            />
            <div
              className={`${styles.tag} hidden-on-small-screen`}
              style={{
                marginLeft: "10px",
                position: "relative",
                left: animation ? 0 : "-220px",
                transition: "left 1s ease-in-out",
              }}
              onClick={() => {
                navigate("/plans");
              }}
            >
              Try Dabdoob Premium
            </div>
            <img
              src={lense}
              className={styles.clickable}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setSearchInput(true);
              }}
            />

            <input
              className={styles["search-input"]}
              style={{
                width: searchInput ? "100px" : "0",
                marginLeft: searchInput ? "10px" : "0",
                overflow: "hidden",
                transition: "1s ease-in-out",
              }}
              placeholder="Search Product"
              onChange={(e) => {
                setSearchInputValue(e.target.value);
                myInputRef.current = e.target.value;
                debouncedHandleInputChange(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              {isUser ? (
                <>
                  <img
                    src={brownHeart}
                    className={styles.clickable}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                    width="25px"
                    onClick={() => {
                      navigate("/wishlist");
                    }}
                  />
                  <div className={`${styles.clickable} ${styles.badge}`}>
                    {wishlist.length}
                  </div>
                </>
              ) : (
                <img
                  src={heart}
                  className={styles.clickable}
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setSidebar("login");
                    toggleDrawer();
                  }}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              {isUser ? (
                <>
                  <img
                    src={brownBag}
                    className={styles.clickable}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                    width="25px"
                    onClick={() => {
                      setSidebar("cart");
                      toggleDrawer();
                    }}
                  />
                  <div className={`${styles.clickable} ${styles.badge}`}>
                    {cart.length}
                  </div>
                </>
              ) : (
                <img
                  src={bag}
                  className={styles.clickable}
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setSidebar("login");
                    toggleDrawer();
                  }}
                />
              )}
            </div>
            {isUser ? (
              <img
                src={user}
                className={styles.clickable}
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  navigate("/profile");
                }}
              />
            ) : (
              <div
                className={styles.clickable}
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  setSidebar("login");
                  toggleDrawer();
                }}
              >
                Sign in
              </div>
            )}
            <img
              src={burger}
              className={`${styles.clickable} hidden-on-large-screen`}
              style={{ marginLeft: "10px", width: "30px" }}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
      {/* dropdown */}
      <div
        className={styles.dropdown}
        style={{ display: dropDown === true ? "block" : "none" }}
        onMouseEnter={() => {
          setDropDown(true);
        }}
        onMouseLeave={() => {
          setDropDown(false);
        }}
      >
        <div className={`padding-container ${styles["dropdown-content"]}`}>
          <div className={styles["dropdown-section"]} style={{ flex: "1" }}>
            {[
              { title: "Shop All", link: "#" },
              { title: "Newborn essentials", link: "#" },
              { title: "Baby boy", link: "#" },
              { title: "Baby girl", link: "#" },
              { title: "Offers", link: "#" },
            ].map(({ title, link }) => (
              <Link to={link} className={styles.link}>
                {title}
              </Link>
            ))}
          </div>
          <div className={styles.line}></div>
          <div
            className={styles["dropdown-section"]}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className={styles.card}>
              <div className={styles["card-image"]}>
                <img src={gift} />
                <img src={baby1} />
              </div>
              <div className={styles["card-text"]}>
                Baby & Kids, Moms, accessories & more
              </div>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles["dropdown-section"]}>
            <div className={styles.card}>
              <img src={baby2} style={{ borderRadius: "8px" }} />
              <div style={{ fontSize: "24px" }}>Dabdoob Kidz</div>
              <div style={{ fontSize: "18px", color: "var(--dark-grey)" }}>
                How to give your child the best sleep possible with our sleep
                system
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* drawer */}
      <div>
        <Drawer anchor="right" open={state} onClose={toggleDrawer}>
          {sidebar === "login" && (
            <Form type="login" toggleDrawer={toggleDrawer} />
          )}
          {sidebar === "cart" && <Cart toggleDrawer={toggleDrawer} />}
        </Drawer>
      </div>
    </>
  );
}
