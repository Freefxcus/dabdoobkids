import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../styles/components/Sidebar.module.css";
import { getCategories, getSubCategories } from "../utils/apiCalls";
import { Link } from "react-router-dom";
export default function Sidebar() {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
    getSubCategories().then((res) => {
      setSubCategories(res);
    });
  }, []);

  const subCategotyNames = subCategories?.data?.data?.categories?.map(
    (subCategory) => {
      return subCategory.name;
    }
  );
  const formattedSybCategoriesLinks = subCategotyNames?.map((subCategory) => {
    return { title: subCategory, link: "/search" } ;
  }) || [];

  const subCategoryLinks = [
    { title: "Shop All", link: "/search" },
    ...formattedSybCategoriesLinks,
  ];
  return (
    <div className={`${styles.sidebar} padding-container`}>
    {categories ?
      categories?.categories?.map((category) => (  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{ minHeight: 0 }}
        >
          <h1>{category.name}</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.content}>
        <div className={styles["dropdown-section"]} style={{ flex: "1" }}>
            {subCategoryLinks.map(({ title, link }) => (
             <div key={category.name + link }> <Link to={link} className={styles.link}>
                {title}
              </Link></div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>)):null}
     
      <div className={styles.line}></div>
      <button className={styles.button}>Login</button>
    </div>
  );
}
