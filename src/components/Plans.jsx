import React, { useEffect } from "react";
import styles from "../styles/components/Plans.module.css";
import premium from "../images/premium.png";
import { ArrowRight2 } from "iconsax-react";
import check from "../images/check.svg";
import { getPlans } from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
export default function Plans() {
  const navigate = useNavigate();
  const [plans, setPlans] = React.useState([]);
  useEffect(() => {
    getPlans().then((res) => {
      setPlans(res);
    });
  }, []);
  // console.log(plans?.items[1]?.extraInfo, "plans");
  //   Object.keys(plans?.items?.extraInfo).map((key,value) => {
  //     console.log(key,"key123231123")

  // })

  useEffect(()=>{
    
  },[])
  return (
    <div className={`${styles.container} `}>
      {plans?.items?.length === 0 ? (
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/empty-wishlist.svg" alt="empy cart" />
            <h2>Empty Wishlist</h2>
            <p>
              Looks like you haven't added any products to your wishlist yet.
            </p>
            <button
              onClick={() => {
                navigate("/");
              }}
              style={{
                backgroundColor: "var(--brown)",
                color: "white",
                border: "none",
                padding: "12px 48px",
                fontWeight: "400",
                fontSize: "18px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              continue shopping
            </button>
          </div>
        </div>
      ) : (
        plans?.items?.map((plan) => (
          <div className={`${styles["premium-container"]} margin-container`}>
            <div
              className={`${styles.column} ${styles["premium-head"]}`}
              style={{ width: "calc(100% - 30px)" }}
            >
              <div className={styles.row}>
                <img src={premium} width="50px" />
                <div>{plan?.name?.en}</div>
              </div>
              <div className={styles.row}>
                <div>{plan?.price}</div>
                <div>/ {plan?.duration}</div>
              </div>
              <div className={styles.row}>
                <div>Get the best benefits with us</div>
              </div>
              <button className={`${styles["premium-button"]} ${styles.row}`}>
                Upgrade to pro plane
                <ArrowRight2
                  onClick={() => {}}
                  size="15"
                  color="var(--white)"
                  variant="Outline"
                />
              </button>
            </div>
            <div
              className={`${styles.column} ${styles["premium-body"]}`}
              style={{ width: "calc(100% - 30px)" }}
            >
              <div style={{ fontWeight: "bold" }}>What’s included?</div>
              {Object.entries(plan?.extraInfo).map((info) => (
                <div className={styles.row}>
                  {info[1] ? (
                    <img src={check} width="20px" />
                  ) : (
                    <img src="/failure.svg" style={{ width: "20px" }} />
                  )}
                  <Box sx={{
                    textDecoration : info[1]? "none" : "line-through",
                  }}>{info[0]}</Box>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
