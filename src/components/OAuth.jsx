import { Box, Button, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams, useSearchParams } from "react-router-dom";

import Modal from "@mui/material/Modal";
import Loader from "./Loader";
import { googleCallback } from "../utils/apiCalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


export default function OAuth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(true);
  useEffect(()=>{
    googleCallback(searchParams.toString()).then((res)=>{
      console.log(res, "<<<resgoogle");
      if(res?.data?.status === "success"){
        localStorage.setItem("access_token", res?.data?.data?.accessToken);
        localStorage.setItem("refresh_token", res?.data?.data?.refreshToken);   
        navigate("/")
      }
    })
  },[])

  console.log(searchParams.toString(), "<<<parammmms");

  return (
   <Loader/>
  );
}
