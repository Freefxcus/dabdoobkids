import React, { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Form from "../components/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import styles from "../styles/components/Header.module.css";
import logo from "../images/logo.svg";
import email from "../images/email.svg";
import phone from "../images/phone.svg";
import lense from "../images/lense.svg";
import heart from "../images/heart.svg";
import brownHeart from "../images/brown-heart.svg";
import bag from "../images/bag.svg";
import brownBag from "../images/brown-bag.svg";
import user from "../images/user.svg";

import premium from "../images/logoPrem.svg";
import burger from "../images/burger.png";
import {
  getCategories,
  getSubCategories,
  getUserPlan,
} from "../utils/apiCalls";
import { useGetAllCartsQuery } from "../Redux/cartApi";
import { useGetAllWishListQuery } from "../Redux/wishlistApi";

export default function Header({ setOpen }) {
  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      if (value) {
        navigate(`search/?query=${value}`);
      }
    }, 2000),
    []
  );
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const [dropDownType, setDropDownType] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sidebar, setSidebar] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const myInputRef = useRef("");
  const navigate = useNavigate();
  const [animation, setAnimation] = useState(false);
  const { data: cartData } = useGetAllCartsQuery();
  const cartItems = cartData?.data || [];
  const { data: wishListData } = useGetAllWishListQuery();
  const wishListItems = wishListData?.data?.[0]?.items || [];

  useEffect(() => {
    getUserPlan().then((res) => {
      if (res?.data?.data?.plan?.id) {
        setIsSubscription(true);
      }
    });
  }, []);
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
      getUserPlan().then((res) => {
        if (res?.data?.data?.plan?.id) {
          setIsSubscription(true);
        }
      });
    } else {
      setIsUser(false);
      setIsSubscription(false);
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

  const formattedSybCategoriesLinks =
    subCategories?.data?.data?.categories?.map((subCategory) => {
      return {
        title: subCategory?.name,
        link: `/search?categoryId=${subCategory?.id}`,
        parentId: subCategory?.category?.id,
      };
    }) || [];

  const subCategoryLinks = [
    {
      title: "Shop All",
      link: `/search?categoryId=${dropDownType}`,
      parentId: dropDownType,
    },
    ...formattedSybCategoriesLinks,
  ];
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
              <img src={email} alt="email" />
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
              <img src={phone} alt="phone" />
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
              src={isSubscription ? premium : logo}
              className={styles["logo"]}
              style={{ width: "100px" }}
              alt="logo "
              onClick={() => {
                navigate("/");
              }}
            />

            {categories &&
              categories?.categories
                ?.slice(0, 5)
                ?.map((category) => (
                  <Dropdown
                    title={category?.name}
                    items={[{ title: "First", link: "#" }]}
                    id={category?.id}
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
              Subscription{" "}
            </div>
            {/* {!isSubscription&&  <img
              src={dabdoob}
              className={`${styles.clickable} hidden-on-small-screen`}
              style={{
                  width:"auto",
                marginLeft: "10px",
                position: "relative",
                left: animation ? 0 : "160px",
                transition: "left 1s ease-in-out",
              }} alt="logo"
              onClick={() => {
                navigate("/plans");
              }}
            />}
          {!isSubscription ? <div
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
            </div>:<div
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
              For Upgrade
            </div>} */}
            <img
              src={lense}
              className={styles.clickable}
              alt="logo"
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
                    alt="brownheart"
                  />
                  <div className={`${styles.clickable} ${styles.badge}`}>
                    {wishListItems?.length || 0}
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
                  alt="heart"
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
                    alt="brownbag"
                  />
                  <div className={`${styles.clickable} ${styles.badge}`}>
                    {cartItems?.length || 0}
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
                  alt="bag"
                />
              )}
            </div>
            {isUser ? (
              <img
                src={user}
                className={styles.clickable}
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  navigate("/profile/1");
                }}
                alt="user"
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
              id="action-component"
              src={burger}
              className={`${styles.clickable} hidden-on-large-screen show-on-small-screen`}
              style={{ marginLeft: "10px", width: "30px" }}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              alt="burger"
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
            {subCategoryLinks
              .filter((sub) => sub.parentId === dropDownType)
              .map(({ title, link }) => (
                <Link to={link} className={styles.link}>
                  {title}
                </Link>
              ))}
          </div>
          {/* <div className={styles.line}></div>
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
          </div> */}
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
