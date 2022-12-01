import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import OnboardingPage from "./OnboardingPage";
import Dashboard from "./dashboard.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Layout from "../Components/layouts";
import { fetchUser } from "../Store";
import { useEffect } from "react";

const Home = () => {
  const [user, loading] = useAuthState(auth)
  /* const { currentUser } = useAuth(); */
  console.log(">>>>", user);

/*     useEffect(()=>{
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

  }, [user]) */

  // you can grab the entire user object on state.loggedInUser


  return (
    <div>
      <Head>
        <title>Task management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? <Layout> <Dashboard /> </Layout> : <OnboardingPage />}
    </div>
  );
};

export default Home;
