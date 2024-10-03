import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { Box } from "@mui/material";
import { getWallet, getWalletHistory } from "../../utils/apiCalls";
import styles from "../../styles/pages/Profile.module.css";

const WalletComponents = () => {
  const [wallet, setWallet] = useState({});
  const [walletHistory, setWalletHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const walletRes = await getWallet();
        setWallet(walletRes);

        const walletHistoryRes = await getWalletHistory();
        setWalletHistory(walletHistoryRes);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {isLoading && <Loader open={true} />}
      {isError && <div>No Orders Created ...</div>}
      {wallet && (
        <Box
          className={styles.text_container}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            // display: "flex",
            // flexDirection: "column",
            // gap: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Box
                sx={{
                  color: "#000",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                wallet
              </Box>
              <Box
                sx={{
                  color: "#AD6B46",
                  fontSize: "36px",
                  fontWeight: "700",
                }}
              >
                {wallet ? wallet?.balance : 0} EGP
              </Box>
            </Box>
          </Box>

          {walletHistory?.items?.length > 0 ? (
            <Box sx={{
                width:"100%",
                overflowX:"auto"
            }}>
              {" "}
              <table className={styles.my_table}>
                <tr>
                  <th>Created</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
                {walletHistory?.items?.map((item, index) => (
                  <tr>
                    <td> {  new Date(item?.createdAt).toLocaleString() }</td>
                    <td>Order Fee</td>
                    <td>Process credits against NEGG20093079663.</td>
                    <td
                      style={{
                        color: index === 2 ? "#F04438" : "#32D583",
                      }}
                    >
                      - EGP {item?.Amount?item?.Amount:"not came for backend"}
                    </td>
                    <td>EGP {item?.wallet}</td>
                  </tr>
                ))}
              </table>{" "}
            </Box>
          ) : (
            <h1>No Wallet History</h1>
          )}
        </Box>
      )}
    </div>
  );
};

export default WalletComponents;
