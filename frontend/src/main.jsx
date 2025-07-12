import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          {/* <App /> */}
          <div class="flex items-center justify-center min-h-screen bg-yellow-100">
            <div class="text-center bg-white border-4 border-yellow-500 text-yellow-700 p-10 rounded-lg shadow-xl max-w-xl w-full">
              <h1 class="text-3xl font-bold mb-4">Payment Required</h1>
              <p class="text-lg">
                Please complete your payment to receive your website delivery.
              </p>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
