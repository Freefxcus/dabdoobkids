import CartAuth from "../components/cart/CartAuth";
import CartOffline from "../components/cart/CartOffline";

function Cart() {
  const isAuth = localStorage.getItem("access_token");

  return isAuth ? <CartAuth /> : <CartOffline />;
}

export default Cart;
