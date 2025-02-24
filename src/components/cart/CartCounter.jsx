import HandleMessageIsAuth from "../../utils/message";

export default function CartCounter({
  increment,
  decrement,
  count,
  CartAddLoad,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "4px",
        border: "1px solid var(--unicorn-silver)",
      }}
    >
      <button
        style={{ background: "white", border: "none", fontSize: "22px" }}
        disabled={CartAddLoad || count <= 1}
        onClick={decrement}
      >
        -
      </button>
      <span style={{ fontSize: "22px" }}>{count}</span>
      <button
        disabled={CartAddLoad}
        style={{ background: "white", border: "none", fontSize: "22px" }}
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
