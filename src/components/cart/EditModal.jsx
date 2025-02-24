import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { getProductById, updateCart } from "../../utils/apiCalls";
import styles from "../../styles/components/OrderCard.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
export default function EditModal({ open, setOpen, product, setCartChanged }) {
  const [productData, setProductData] = useState({});
  useEffect(() => {
    getProductById(product?.product?.id).then((res) => {
      setProductData(res);
    });
  }, [product]);
  console.log(productData, "product123123123zzzzzzzz");
  const [selectedVariant, setSelectedVariant] = useState(product?.variant);
  const handleUpdate = ()=>{
     updateCart(productData?.id, selectedVariant?.id  ).then((res)=>{

        if(res.status===200){
            toast.success("Product Updated Successfully")
            setCartChanged((prev)=>!prev)
            setOpen(false)
        }
        // setCartChanged((prev)=>!prev)
        // setOpen(false)

     }
    )
  }
  
  return (
    <Modal open={open}>
      <Box sx={style}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" , width : "350px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ marginBottom: "12px" }}>Edit Cart</h1>
            <CloseIcon
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <img
              src={product?.product?.images[0]}
              style={{ width: "116px", height: "150px" }}
              alt="productImage"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3>{product?.product?.name}</h3>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  textTransform: "capitalize",
                }}
              >
                <span>{product?.variant?.size}</span>

                <span>Color : </span>
                <span
                  className={styles.color}
                  style={{
                    backgroundColor: `${product?.variant?.color}`,
                    marginLeft: "6px",
                  }}
                ></span>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{marginBottom : "12px"}}>Size</h3>
            <div style={{ display: "flex", gap: "12px" }}>
              {productData?.variants?.map((variant,index) => (
                <button
                onClick={() => {
                    setSelectedVariant(variant);
                   
                }}
                key={index}
                  style={{
                    backgroundColor: selectedVariant?.id === variant.id ? "var(--brown)" : "transparent",
                    padding: "8px 16px",
                    color : selectedVariant?.id === variant.id ? "white" : "var(--errie-black)",
                    border: selectedVariant?.id === variant.id ? "none" : "1px solid var(--errie-black)",
              
                    cursor: "pointer",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
          <button
        onClick={handleUpdate}
          style={{
            backgroundColor: "var(--brown)",
            color: "white",
            border: "none",
            padding: "12px 32px",
            fontWeight: "400",
            fontSize: "18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
            Update Product
        </button>
        </div>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "10px",
  px: 4,
  p: 4,
};
