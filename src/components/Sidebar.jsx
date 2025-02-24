import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/components/Sidebar.module.css";
import {
  getCategories,
  getSubCategories,
  getUserPlan,
} from "../utils/apiCalls";

import LoaderSpinner from "./LoaderSpinner";
import { userAuthAction } from "../Redux/store";
import { useDispatch } from "react-redux";

export default function Sidebar({ setOpen, open }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUser, setIsUser] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [isLoadingSubCategory, setIsLoadingSubCategory] = useState(false);

  const dispatch = useDispatch();

  const [isSubscription, setIsSubscription] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the first render
      isFirstRender.current = false;
    } else {
      // Only execute this after the first render
      if (open) {
        setOpen(false);
      }
    }
  }, [location.pathname, open]);

  useEffect(() => {
    if (document && open) {
      const searchIcon = document.getElementById("action-component");
      const SidebarContent = document.getElementById("sidebar-content");

      const handleCloseOutside = (e) => {
        if (
          !searchIcon?.contains(e.target) &&
          !SidebarContent?.contains(e.target)
        ) {
          return setOpen(false);
        }
      };
      const handlePress = (e) => {
        if (e.keyCode === 27) {
          setOpen(false);
        }
      };
      document.addEventListener("keydown", handlePress);
      document.addEventListener("click", handleCloseOutside);
      return () => document.removeEventListener("click", handleCloseOutside);
    }
  }, [open]);

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

  return (
    <div className={`${styles.sidebar} padding-container`} id="sidebar-content">
      {categories
        ? categories?.categories?.slice(0, 5)?.map((category) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setActiveSubCategory(category.id)}
              >
                <h5>{category.name}</h5>
              </AccordionSummary>
              <AccordionDetails className={styles.content}>
                {isLoadingSubCategory ? (
                  <LoaderSpinner small={true} />
                ) : (
                  <>
                    {/* <div style={{ fontWeight: "bold" }}>
                      {subCategories?.[0]?.category?.name}
                    </div> */}

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
                            onClick={() => setOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))
                      : null}
                  </>
                )}
                {/* <div
                  className={styles["dropdown-section"]}
                  style={{ flex: "1" }}
                >
                  <div onClick={() => setOpen(false)}>
                    {" "}
                    <Link
                      to={`/search?categoryId=${category?.id}`}
                      className={styles.link}
                    >
                      Shop All
                    </Link>
                  </div>

                  {subCategoryLinks
                    .filter(
                      (sub) =>
                        sub.parentId == category.id || sub.parentId == "all"
                    )
                    .map(({ title, link }) => (
                      <div
                        key={category.name + title}
                        onClick={() => setOpen(false)}
                      >
                        {" "}
                        <Link to={link} className={styles.link}>
                          {title}
                        </Link>
                      </div>
                    ))}
                </div> */}
              </AccordionDetails>
            </Accordion>
          ))
        : null}

      <button
        onClick={() => {
          navigate("/plans");
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          margin: "20px 0px",
          width: "100%",
          border: "none",
          borderRadius: "999px",
          backgroundColor: "var(--brown)",
          padding: "10px",
          color: "white",
          fontFamily: "600",
          cursor: "pointer",
        }}
        type="button"
      >
        <div
          style={{
            marginLeft: "10px",
            position: "relative",

            transition: "left 1s ease-in-out",
          }}
          onClick={() => {
            navigate("/plans");
          }}
        >
          Subscription
        </div>
      </button>
      <div className={styles.line}></div>
      {isUser ? (
        <button
          className={styles.button}
          onClick={() => {
            dispatch(userAuthAction.logout());
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
            return;
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => {
            setOpen(false);
            navigate("/login");
          }}
        >
          sign in
        </button>
      )}
    </div>
  );
}
