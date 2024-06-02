import React, { useState } from "react";
import { createContext, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./Redux/store";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import News from "./pages/News";
import Otp from "./pages/Otp";
import About from "./pages/About";
import Search from "./pages/Search";
import Summary from "./pages/Summary";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Categories from "./pages/Categories";
import Plans from "./components/Plans";
// --
import Sidebar from "./components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OAuth from "./components/OAuth";
import WishList from "./pages/WishList";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OrderDetails from "./components/orders/OrderDetails";
import ForgetPassword from "./pages/ForgetPassword";
import PostPayment from "./pages/post-payment";

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  persistor.purge();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route path="/auth/google/callback" element={<OAuth />} />
                  <Route path="/otp" element={<Otp />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/news" element={<News />} />
                  <Route
                    path="/checkout"
                    element={<ProtectedRoute element={Checkout} />}
                  />
                  <Route
                    path="/summary"
                    element={<ProtectedRoute element={Summary} />}
                  />
                  <Route
                    path="/cart"
                    element={<ProtectedRoute element={Cart} />}
                  />
                  <Route
                    path="/profile"
                    element={<ProtectedRoute element={Profile} />}
                  />
                  <Route
                    path="/plans"
                    element={<ProtectedRoute element={Plans} />}
                  />
                  <Route
                    path="/categories"
                    element={<ProtectedRoute element={Categories} />}
                  />
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
                </>
              )}
            </Routes>
            {!open && <Footer />}
            {open && <Sidebar />}
          </div>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
