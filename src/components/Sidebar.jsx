import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../styles/components/Sidebar.module.css";
import { getCategories, getSubCategories } from "../utils/apiCalls";
import { Link, useNavigate } from "react-router-dom";
export default function Sidebar({setOpen}) {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
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

  const formattedSybCategoriesLinks = subCategories?.data?.data?.categories?.map(
    (subCategory) => {
      return { title: subCategory?.name, link: `/search&categoryId=${subCategory?.id}` ,parentId:subCategory?.category?.id} ;
    }
  )|| [];

  const subCategoryLinks = [
    ...formattedSybCategoriesLinks,
  ];
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsUser(true);
    }
  }, [localStorage.getItem("access_token")]);

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

        <div  onClick={()=>setOpen(false)}> <Link to={`/search&categoryId=${category?.id}`} className={styles.link}>
        Shop All
              </Link></div>
            {subCategoryLinks.filter(sub=>sub.parentId==category.id||sub.parentId=="all").map(({ title, link }) => (
             <div key={category.name + title } onClick={()=>setOpen(false)}> <Link to={link} className={styles.link}>
                {title}
              </Link></div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>)):null}
     
      <div className={styles.line}></div>
      {isUser ? (
        <button className={styles.button} onClick={()=>{  localStorage.removeItem("access_token");
                  setOpen(false) }}>Logout</button>
            ) : (
              <button
                className={styles.button}
                onClick={() => {
                  
                  setOpen(false)
                  navigate("/login");
                }}
              >
               sign in
              </button>
            )}
      
    </div>
  );
}
