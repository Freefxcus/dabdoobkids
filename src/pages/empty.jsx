import { useNavigate } from "react-router-dom";
import emptyImg from "../images/empty.svg";

export default function Empty({title , message}) {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%",margin :"0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:"center",
          gap: "12px",
          minHeight:"80vh"
        }}
      >
        <img src={emptyImg} alt="empy cart" />
        <h2>{title}</h2>
        <p>{message}</p>
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
  );
}
