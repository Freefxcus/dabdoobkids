import Drawer from "@mui/material/Drawer";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import bag from "../images/bag.svg";
import email from "../images/email.svg";
import heart from "../images/heart.svg";
import lense from "../images/lense.svg";
import phone from "../images/phone.svg";
import user from "../images/user.svg";
import { useGetAllCartsQuery } from "../Redux/cartApi";
import { useGetAllWishListQuery } from "../Redux/wishlistApi";
import styles from "../styles/components/Header.module.css";
import {
  getCategories,
  getSubCategories,
  getUserPlan,
} from "../utils/apiCalls";
import Cart from "./Cart";
import CartDrawOffline from "./CartDrawOffline";
import Dropdown from "./Dropdown";
import LoaderSpinner from "./LoaderSpinner";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/material";
export default function Header({ setOpen }) {
  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      if (value) {
        navigate(`search/?query=${value}`);
      }
    }, 2000),
    []
  );

  const [dropDown, setDropDown] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sidebar, setSidebar] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [isLoadingSubCategory, setIsLoadingSubCategory] = useState(false);
  const myInputRef = useRef("");
  const navigate = useNavigate();
  const [animation, setAnimation] = useState(false);
  const { data: cartData } = useGetAllCartsQuery();
  const cartItems = cartData?.data || [];
  const { data: wishListData } = useGetAllWishListQuery();
  const wishListItems = wishListData?.data?.[0]?.items || [];

  const cartOffline = useSelector((state) => state.cart.products) || [];

  const numCart = isUser
    ? cartItems.reduce((acc, curr) => acc + curr?.count, 0)
    : cartOffline.reduce((acc, curr) => acc + curr?.count, 0);

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
  }, []);

  useEffect(() => {
    if (activeSubCategory) setIsLoadingSubCategory(true);
    getSubCategories(activeSubCategory && `category=${activeSubCategory}`).then(
      (res) => {
        setSubCategories(res.data.data.categories);
        setIsLoadingSubCategory(false);
      }
    );
  }, [activeSubCategory]);

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
              <div>example@example.com</div>
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
              <div>11111111111</div>
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
            <Link
              to="/"
              style={{
                // height: "38px",
                overflow: "hidden",
                display: "grid",
                placeContent: "center",
                textDecoration: "none",
                fontSize: 22,
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Logo
            </Link>

            {categories &&
              categories?.categories
                ?.slice(0, 5)
                ?.map((category) => (
                  <Dropdown
                    title={category?.name}
                    id={category?.id}
                    setDropDown={setDropDown}
                    setActiveSubCategory={setActiveSubCategory}
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
                    src={heart}
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
                    src={bag}
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
                    {numCart}
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={bag}
                    className={styles.clickable}
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                    onClick={() => {
                      setSidebar("cart");
                      toggleDrawer();
                    }}
                    alt="bag"
                  />
                  {numCart ? (
                    <div className={`${styles.clickable} ${styles.badge}`}>
                      {numCart}
                    </div>
                  ) : null}
                </>
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
              <Link
                to={"/login"}
                style={{
                  marginLeft: "10px",
                  display: "block",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Sign in
              </Link>
            )}
            <div
              id="action-component"
              style={{ marginLeft: "10px", width: "30px" }}
              className={`${styles.clickable} hidden-on-large-screen show-on-small-screen`}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <Menu />
            </div>
          </div>
        </div>
      </div>
      {/* dropdown */}
      <div
        className={styles.dropdown}
        style={{ display: dropDown === true ? "block" : "none" }}
      >
        <div className={`padding-container ${styles["dropdown-content"]}`}>
          <div className={styles["dropdown-section"]} style={{ flex: "1" }}>
            {isLoadingSubCategory ? (
              <LoaderSpinner small={true} />
            ) : (
              <>
                <div style={{ fontWeight: "bold" }}>
                  {subCategories?.[0]?.category?.name}
                </div>

                <Link
                  to={`/search?category=${subCategories?.[0]?.category?.id}`}
                  className={styles.link}
                >
                  Shop All
                </Link>

                {activeSubCategory && subCategories.length
                  ? subCategories.map((item) => (
                      <Link
                        to={`/search?subcategory=${item.id}`}
                        key={item.id}
                        className={styles.link}
                        onClick={() => setDropDown(false)}
                      >
                        {item.name}
                      </Link>
                    ))
                  : null}
              </>
            )}
          </div>
        </div>
      </div>
      {/* drawer */}
      <div>
        <Drawer anchor="right" open={state} onClose={toggleDrawer}>
          {sidebar === "login" && (
            <Form type="login" toggleDrawer={toggleDrawer} />
          )}
          {sidebar === "cart" && isUser && <Cart toggleDrawer={toggleDrawer} />}
          {sidebar === "cart" && !isUser && (
            <CartDrawOffline toggleDrawer={toggleDrawer} />
          )}
        </Drawer>
      </div>
    </>
  );
}
