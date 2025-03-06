import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Details from "../pages/Details";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import OAuth from "./OAuth";
import Otp from "./Otp";
import About from "../pages/About";
import ReturnsRefunds from "../pages/ReturnsRefunds";
import PrivacyPolicy from "../pages/ReturnsRefunds copy";
import PaymentInformation from "../pages/PaymentInformation";
import FAQ from "../pages/FAQPage";
import News from "../pages/News";
import Checkout from "../pages/Checkout";
import Summary from "../pages/Summary";
import Profile from "../pages/Profile";
import Plans from "./Plans";
import Categories from "../pages/Categories";
import WishList from "../pages/WishList";
import PostPayment from "../pages/post-payment";
import OrderDetails from "./orders/OrderDetails";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "../Redux/cartApi";
import { cartActions, isUserAuth, userAuthAction } from "../Redux/store";
import Cart from "../pages/Cart";
import Search from "../pages/Search";

function AppContainer() {
  const isAuth = useSelector(isUserAuth);

  const cartOfflineProducts = useSelector((state) => state.cart.products) || [];
  const dispatch = useDispatch();

  const [
    addToCart,
    {
      isLoading: CartAddLoad,
      isSuccess: isSuccessAddCart,
      isError: isErrorAddCart,
      data: addToCartData, // Contains the response from the mutation if successful
      error: addCartError, // Capture the error object
    },
  ] = useAddToCartMutation();

  console.log("App Container", "products Cart Offline", cartOfflineProducts);

  const productsUpload = cartOfflineProducts.length
    ? structuredClone(cartOfflineProducts).map((item) => [
        {
          product: item.id,
          count: item.count,
          variant: item.variant,
        },
      ])
    : [];

  useEffect(() => {
    const addProductsToCart = async () => {
      if (productsUpload.length) {
        productsUpload.map(async (item) => {
          await addToCart(item).unwrap();
        });
        dispatch(cartActions.clearCart());
      }
    };

    if (localStorage.getItem("access_token") && !isAuth)
      dispatch(userAuthAction.login(localStorage.getItem("access_token")));

    if (!localStorage.getItem("access_token"))
      dispatch(userAuthAction.logout());

    if (isAuth) addProductsToCart();
  }, [dispatch, isAuth]);

  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <Header setOpen={setOpen} />
      <Routes>
        {!open && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/404" element={<Error />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
            <Route path="/auth/google" element={<OAuth />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/returns-refunds" element={<ReturnsRefunds />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/payment-information"
              element={<PaymentInformation />}
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/news" element={<News />} />
            <Route
              path="/checkout"
              element={<ProtectedRoute element={Checkout} />}
            />
            <Route
              path="/summary"
              element={<ProtectedRoute element={Summary} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/profile/:step"
              element={<ProtectedRoute element={Profile} />}
            />
            <Route path="/plans" element={<ProtectedRoute element={Plans} />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/wishlist"
              element={<ProtectedRoute element={WishList} />}
            />
            <Route
              path="/post-payment"
              element={<ProtectedRoute element={PostPayment} />}
            />

            <Route
              path="/order/:id"
              element={<ProtectedRoute element={OrderDetails} />}
            />
            <Route path="*" element={<Error />} />
          </>
        )}
      </Routes>
      {!open && <Footer />}
      {open && <Sidebar setOpen={setOpen} open={open} />}
    </div>
  );
}

export default AppContainer;
