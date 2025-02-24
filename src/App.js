import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContainer from "./components/AppContainer";

function App() {
  persistor.purge();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
      <ToastContainer
        toastStyle={{ color: "#5F5F5F", fontSize: "14px", fontWeight: 500 }}
      />
    </BrowserRouter>
  );
}

export default App;
