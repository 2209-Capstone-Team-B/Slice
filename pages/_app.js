import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Layout from "../Components/layouts";
import store from "../Store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
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
