import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import OnboardingPage from './OnboardingPage';
import Dashboard from './dashboard';

const Home = () => {
  const { currentUser } = useAuth();
  console.log('>>>>', currentUser);

  return (
    <div>
      <Head>
        <title>Task management</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* {!currentUser && <OnboardingPage />} */}
      {/* {currentUser && <Dashboard />} */}
      <OnboardingPage />
    </div>
  );
};

export default Home;
