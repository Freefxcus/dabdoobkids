import React, { useEffect, useRef, useCallback, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { debounce } from "lodash";
import Cart from "./Cart";
import Form from "../components/Form";
import Dropdown from "./Dropdown";
import styles from "../styles/components/Header.module.css";
import {
  getCategories,
  getSubCategories,
  getUserPlan,
} from "../utils/apiCalls";
import { useGetAllCartsQuery } from "../Redux/cartApi";
import { useGetAllWishListQuery } from "../Redux/wishlistApi";

// Import all images
import logo from "../images/logo.svg";
import premium from "../images/logoPrem.svg";
import email from "../images/email.svg";
import phone from "../images/phone.svg";
import lense from "../images/lense.svg";
import heart from "../images/heart.svg";
import brownHeart from "../images/brown-heart.svg";
import bag from "../images/bag.svg";
import brownBag from "../images/brown-bag.svg";
import user from "../images/user.svg";
import burger from "../images/burger.png";

export default function Header({ setOpen }) {
  const [dropDownType, setDropDownType] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sidebar, setSidebar] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [state, setState] = useState(false);
  const [animation, setAnimation] = useState(false);

  const myInputRef = useRef("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: cartData } = useGetAllCartsQuery();
  const cartItems = cartData?.data || [];
  const { data: wishListData } = useGetAllWishListQuery();
  const wishListItems = wishListData?.data?.[0]?.items || [];

  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      if (value) {
        navigate(`search/?query=${value}`);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

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
    return () => clearTimeout(animationTimeoutId);
  }, []);

  useEffect(() => {
    const searchInputTimeoutId = setTimeout(() => {
      if (!myInputRef.current) {
        setSearchInput(false);
      }
    }, 4000);
    return () => clearTimeout(searchInputTimeoutId);
  }, [searchInput, searchInputValue]);

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
    getCategories().then((res) => setCategories(res));
    getSubCategories().then((res) => setSubCategories(res));
  }, []);

  const toggleDrawer = () => setState((prev) => !prev);

  const formattedSubCategoriesLinks =
    subCategories?.data?.data?.categories?.map((subCategory) => ({
      title: subCategory?.name,
      link: `/search?categoryId=${subCategory?.id}`,
      parentId: subCategory?.category?.id,
    })) || [];

  const subCategoryLinks = [
    {
      title: "Shop All",
      link: `/search?categoryId=${dropDownType}`,
      parentId: dropDownType,
    },
    ...formattedSubCategoriesLinks,
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.topBar} padding-container`}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <img src={email || "/placeholder.svg"} alt="email" />
              <span>blabla@gmail.com</span>
            </div>
            <div className={styles.contactItem}>
              <img src={phone || "/placeholder.svg"} alt="phone" />
              <span>099-88293-03</span>
            </div>
          </div>
        </div>

        <div className={`${styles.mainBar} padding-container`}>
          <img
            src="/images/Header Logo (1).png"
            className={styles.logo}
            alt="logo"
            onClick={() => navigate("/")}
          />

          <nav className={styles.navigation}>
            {categories?.categories?.slice(0, 5).map((category) => (
              <Dropdown
                key={`${category?.id}-${category?.name}`}
                title={category?.name}
                items={[{ title: "First", link: "#" }]}
                id={category?.id}
                dropDown={dropDown}
                setDropDown={setDropDown}
                setDropDownType={setDropDownType}
              />
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              className={`${styles.subscriptionBtn} hidden-on-small-screen`}
              onClick={() => navigate("/plans")}
            >
              Subscription
            </button>

            <div className={styles.searchContainer}>
              <img
                src={lense || "/placeholder.svg"}
                className={styles.searchIcon}
                alt="search"
                onClick={() => setSearchInput(true)}
              />
              <input
                className={`${styles.searchInput} ${
                  searchInput ? styles.active : ""
                }`}
                placeholder="Search Product"
                onChange={(e) => {
                  setSearchInputValue(e.target.value);
                  myInputRef.current = e.target.value;
                  debouncedHandleInputChange(e.target.value);
                }}
              />
            </div>

            <div className={styles.iconGroup}>
              {isUser ? (
                <>
                  <div className={styles.iconWithBadge}>
                    <img
                      src={brownHeart || "/placeholder.svg"}
                      className={styles.icon}
                      onClick={() => navigate("/wishlist")}
                      alt="wishlist"
                    />
                    <span className={styles.badge}>
                      {wishListItems?.length || 0}
                    </span>
                  </div>
                  <div className={styles.iconWithBadge}>
                    <img
                      src={brownBag || "/placeholder.svg"}
                      className={styles.icon}
                      onClick={() => {
                        setSidebar("cart");
                        toggleDrawer();
                      }}
                      alt="cart"
                    />
                    <span className={styles.badge}>
                      {cartItems?.length || 0}
                    </span>
                  </div>
                  <img
                    src={user || "/placeholder.svg"}
                    className={styles.icon}
                    onClick={() => navigate("/profile/1")}
                    alt="profile"
                  />
                </>
              ) : (
                <>
                  <img
                    src={heart || "/placeholder.svg"}
                    className={styles.icon}
                    onClick={() => {
                      setSidebar("login");
                      toggleDrawer();
                    }}
                    alt="wishlist"
                  />
                  <img
                    src={bag || "/placeholder.svg"}
                    className={styles.icon}
                    onClick={() => {
                      setSidebar("login");
                      toggleDrawer();
                    }}
                    alt="cart"
                  />
                  <button
                    className={styles.signInBtn}
                    onClick={() => {
                      setSidebar("login");
                      toggleDrawer();
                    }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>

            <img
              src={burger || "/placeholder.svg"}
              className={`${styles.burgerMenu} hidden-on-large-screen show-on-small-screen`}
              onClick={() => setOpen((prev) => !prev)}
              alt="menu"
            />
          </div>
        </div>

        {dropDown && (
          <div
            className={styles.dropdown}
            onMouseEnter={() => setDropDown(true)}
            onMouseLeave={() => setDropDown(false)}
          >
            <div className={`padding-container ${styles.dropdownContent}`}>
              <div className={styles.dropdownSection}>
                {subCategoryLinks
                  .filter((sub) => sub.parentId === dropDownType)
                  .map(({ title, link }) => (
                    <Link key={title} to={link} className={styles.link}>
                      {title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <Drawer anchor="right" open={state} onClose={toggleDrawer}>
        {sidebar === "login" && (
          <Form type="login" toggleDrawer={toggleDrawer} />
        )}
        {sidebar === "cart" && <Cart toggleDrawer={toggleDrawer} />}
      </Drawer>
    </>
  );
}
