import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Layout from "../Components/layouts";
import store, { fetchUser } from "../Store";
import { useEffect } from "react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  

  return (
    <Provider store={store}>
      <AuthProvider>
            <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
