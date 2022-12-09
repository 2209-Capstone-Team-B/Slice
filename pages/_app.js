import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Layout from "../Components/layouts";
import store, { fetchUser } from "../Store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Account from "../Components/account";
import Loading from "../Components/Loading";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loggedIn) {
      router.push("/");
    } else {
      setLoggedIn(true);
    }
  }, []);

  if (loading) return <Loading />;
  // you can grab the entire user object on state.loggedInUser
  return (
    <Provider store={store}>
      <AuthProvider>
        {user ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
