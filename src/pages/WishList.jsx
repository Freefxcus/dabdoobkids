import { useEffect, useState } from "react"
import { getWishlistItems } from "../utils/apiCalls";
import Productcard from "../components/ProductCard";
import { Box } from "@mui/material";


export default function WishList() {
    const [wishList, setWishList] = useState([]);
    const [changed , setChanged] = useState(false);
    useEffect(() => {
        const fetchWishList = async () => {
            const wishList = await getWishlistItems();
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

  return (
    <div style={{margin : "12px 24px" }} >
        <h1 style={{fontSize : "32px" , fontWeight : "400" , margin : "12px auto"}}>My WishList</h1>

        <Box sx={{display : "grid" , gridTemplateColumns : {lg :"repeat(4,1fr)" , md :"repeat(2,1fr)"  , xs : "repeat(1,1fr)" }, justifyItems : "center"}}>
            {wishList?.map(item => (
                <Productcard item={item.product} setChanged = {setChanged} />
            ))}
        </Box>
    </div>
  )
}
