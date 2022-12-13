import Head from "next/head";
import OnboardingPage from "./OnboardingPage";
import Dashboard from "./dashboard.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <Head>
        <title>Slice</title>
        <meta name="description" content="Group Task-Management App" />
        <link rel="icon" href="/https://icons8.com/icon/qmqQkQjR7JHk/citrus" />
      </Head>
      {user ? <Dashboard /> : <OnboardingPage />}
    </div>
  );
};

export default Home;
