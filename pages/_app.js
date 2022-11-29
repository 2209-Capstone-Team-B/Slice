import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const updateDb = async () => {
        const data = await setDoc(
          doc(db, "Users", user.uid),
          {
            email: user.email,
            created: serverTimestamp(),
          },
          { merge: true }
        );
      };
      updateDb().catch(console.error);
    }
  }, [user]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
