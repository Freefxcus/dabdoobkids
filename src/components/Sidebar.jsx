import React, { useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dabdoob from "../images/dabdoob.svg";
import premium from "../images/premium.png";
import styles from "../styles/components/Sidebar.module.css";
import {
  getCategories,
  getSubCategories,
  getUserPlan,
} from "../utils/apiCalls";
import { Link, useNavigate, useLocation } from "react-router-dom";
export default function Sidebar({ setOpen, open }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUser, setIsUser] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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
    getSubCategories().then((res) => {
      setSubCategories(res);
    });
  }, []);

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

  const formattedSybCategoriesLinks =
    subCategories?.data?.data?.categories?.map((subCategory) => {
      return {
        title: subCategory?.name,
        link: `/search&categoryId=${subCategory?.id}`,
        parentId: subCategory?.category?.id,
      };
    }) || [];

  const subCategoryLinks = [...formattedSybCategoriesLinks];
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsUser(true);
    }
  }, [localStorage.getItem("access_token")]);

  return (
    <div className={`${styles.sidebar} padding-container`} id="sidebar-content">
      {categories
        ? categories?.categories?.slice(0,5)?.map((category) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                // style={{ minHeight: 0 }}
              >
                <h1>{category.name}</h1>
              </AccordionSummary>
              <AccordionDetails className={styles.content}>
                <div
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
                </div>
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
            localStorage.removeItem("access_token");
            setOpen(false);
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
