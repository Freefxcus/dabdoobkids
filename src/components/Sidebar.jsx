import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../styles/components/Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={`${styles.sidebar} padding-container`}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{ minHeight: 0 }}
        >
          <h1>Boy</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.content}>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{ minHeight: 0 }}
        >
          <h1>Boy</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.content}>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{ minHeight: 0 }}
        >
          <h1>Boy</h1>
        </AccordionSummary>
        <AccordionDetails className={styles.content}>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
          <p>Sweater</p>
        </AccordionDetails>
      </Accordion>
      <div className={styles.line}></div>
      <button className={styles.button}>Login</button>
    </div>
  );
}
