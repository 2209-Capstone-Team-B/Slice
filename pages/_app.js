import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Layout from "../Components/layouts";
import store, {fetchUser} from "../Store"
import {useEffect} from "react"
import {Provider} from "react-redux"

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

/*   useEffect(()=>{
 if (user){
  const getUser = async() =>{
    try {
      await fetchUser(user.uid)
    } catch (error) {
     console.log(error)
    }
  }
  getUser()
 }

  }, []) */

  // you can grab the entire user object on state.loggedInUser

  return (
    <Provider store = {store}>
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
