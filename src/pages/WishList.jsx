import { useEffect, useState } from "react"
import { getWishlistItems } from "../utils/apiCalls";
import Productcard from "../components/ProductCard";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { set } from "lodash";
import Loader from "../components/Loader";


export default function WishList() {
    const navigate = useNavigate();
    const [wishList, setWishList] = useState([]);
    const [changed , setChanged] = useState(false);
    const [loading , setLoading] = useState(true);
   
    useEffect(() => {
        const fetchWishList = async () => {
            const wishList = await getWishlistItems();
            setLoading(false);
            console.log(wishList,"wishList123123");
            setWishList(wishList);
        }
        fetchWishList();
    },[])
    console.log(changed,"changed123123");
    useEffect(() => {
        const fetchWishList = async () => {
            const wishList = await getWishlistItems();
            setWishList(wishList);
        }
        fetchWishList();
    },[changed])

    console.log(wishList,"wishList123123");
    if(loading){
        return <Loader open={true} />
    }
  return (
    <div style={{margin : "12px 24px" }} >
        <h1 style={{fontSize : "32px" , fontWeight : "400" , margin : "12px auto"}}>My WishList</h1>
        {wishList?.length === 0 ? (<div style={{width :"100%"}}>
            <div style={{display : "flex" , flexDirection : "column" , alignItems : "center" , gap : "12px"}}>
            <img src="/empty-wishlist.svg" alt="empy cart"/>
            <h2>Empty Wishlist</h2>
            <p>Looks like you haven't added any products to your wishlist yet.</p>
            <button
        onClick={()=>{
            navigate("/")
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
        </div>) :
        (<Box sx={{display : "grid" , gridTemplateColumns : {lg :"repeat(4,1fr)" , md :"repeat(2,1fr)"  , xs : "repeat(1,1fr)" }, justifyItems : "center"}}>
            {wishList?.map(item => (
                <Productcard item={item.product} setChanged = {setChanged} />
            ))}
        </Box>) }
    </div>
  )
}
