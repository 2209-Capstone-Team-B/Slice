import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";

const AuthPage = () => {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth);

  const { login, signup } = useAuth();

  useEffect(() => {
    if (user) {
      const updateDb = async () => {
        const data = await setDoc(
          doc(db, "Users", user.uid),
          {
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            created: serverTimestamp(),
          },
          { merge: true }
        );
      };
      updateDb().catch(console.error);
    }
  }, [user]);

  const handleClick = () => {
    setSignIn(!signIn);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      setError("Email or Password unrecognized");
    }
  };

  const handleSignUp = async () => {
    try {
      await signup(email, password);
    } catch (error) {
      setError;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mb-0 bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] object-top">
        <Link href="/">
          <h1 className="text-9xl antialiased font-serif-thin p-10 flex justify-center items-center hover:text-green-200">
            Slice
          </h1>
        </Link>
        <div className="pb-5 flex space-x-10 justify-center items-center">
          <Link href="/AuthPage">
            <button
              className={`hover:text-slate-500 underline underline-offset-8 ${
                signIn ? "decoration-yellow-400" : "decoration-green-400"
              } text-2xl`}
              onClick={!signIn ? handleClick : null}
            >
              Sign In
            </button>
          </Link>
          <Link href="/AuthPage">
            <button
              className={`hover:text-slate-500 underline underline-offset-8 ${
                signIn ? "decoration-green-400" : "decoration-yellow-400"
              } text-2xl`}
              onClick={signIn ? handleClick : null}
            >
              Sign Up
            </button>
          </Link>
        </div>
        {signIn ? (
          <div>
            <div className="flex justify-center items-center p-5 text-black">
              <input
                type="text"
                value={email}
                placeholder="Email..."
                className="rounded-3xl p-3"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex justify-center items-center p-6 text-black">
              <input
                type="password"
                value={password}
                placeholder="Password..."
                className="rounded-3xl p-3"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              onClick={handleLogin}
              className="flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center p-5 text-black">
              <input
                type="text"
                value={firstName}
                placeholder="First Name..."
                className="rounded-3xl p-3"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="flex justify-center items-center p-5 text-black">
              <input
                type="text"
                value={lastName}
                placeholder="Last Name..."
                className="rounded-3xl p-3"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="flex justify-center items-center p-5 text-black">
              <input
                type="text"
                value={email}
                placeholder="Email..."
                className="rounded-3xl p-3"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex justify-center items-center p-6 text-black">
              <input
                type="password"
                value={password}
                placeholder="Password..."
                className="rounded-3xl p-3"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              onClick={handleSignUp}
              className="flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
