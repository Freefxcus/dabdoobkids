import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { Box, Stack } from "@mui/material";
import { getWallet, getWalletHistory } from "../../utils/apiCalls";
import styles from "../../styles/pages/Profile.module.css";

const WalletComponents = () => {
  const [wallet, setWallet] = useState({});
  const [walletHistory, setWalletHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const options = { day: "2-digit", month: "short", year: "numeric" };

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
    <div style={{ width: "100%" }}>
      {isLoading && <Loader open={true} />}
      {isError && <div>No Orders Created ...</div>}
      {wallet && (
        <Stack
          className={styles.text_container}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Box
            component={"div"}
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
                Wallet
              </Box>
              <Box
                sx={{
                  color: "#000",
                  fontSize: "36px",
                  fontWeight: "700",
                }}
              >
                {wallet ? wallet?.balance : 0} EGP
              </Box>
            </Box>
          </Box>

          <Stack
            sx={{
              position: "relative",
              flex: 1,
              maxWidth: { xs: "80vw", sm: "60vw" },
            }}
          >
            {walletHistory?.items?.length > 0 ? (
              <Stack sx={{ overflowX: "auto", maxWidth: "100%" }}>
                <table className={styles.my_table}>
                  <thead>
                    <tr>
                      <th>Created</th>
                      <th>Details</th>
                      <th>Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletHistory?.items?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {new Date(item?.createdAt)?.toLocaleDateString(
                            "en-GB",
                            options
                          )}
                        </td>
                        <td>Process credits against {item?.order}.</td>
                        <td
                          style={{
                            color: item?.credits?.startsWith("-")
                              ? "#F04438"
                              : "#32D583",
                          }}
                        >
                          {item?.credits} EGP
                        </td>
                        <td>{item?.wallet} EGP</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Stack>
            ) : (
              <h1>No Wallet History</h1>
            )}
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default WalletComponents;
