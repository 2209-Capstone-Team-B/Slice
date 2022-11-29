import { auth, db } from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const data = router.query;

  useEffect(() => {
    if (user && Object.keys(data).length !== 0) {
      const updateDb = async () => {
        const data2 = await setDoc(
          doc(db, "Users", user.uid),
          {
            email: user.email,
            firstName: data.firstName,
            lastName: data.lastName,
            created: serverTimestamp(),
          },
          { merge: true }
        );
      };

      updateDb().catch(console.error);
    }
  }, [user]);

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <h1 className="text-4xl mb-5 font-bold">Dashboard</h1>
      <span className="text-7xl">Tasks</span>
    </div>
  );
}
