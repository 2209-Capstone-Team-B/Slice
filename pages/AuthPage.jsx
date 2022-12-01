import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthPage = () => {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { currentUser, login, signup } = useAuth();
  const myauth = getAuth();

  const handleClick = () => {
    setSignIn(!signIn);
  };

  const handleLogin = async () => {
    if (signIn) {
      try {
        await login(email, password);
        router.push("/dashboard");
      } catch (error) {
        console.log(">>>>>", error);
        setError("Incorrect Email or Password");
      }
    }
  };

  const saveToDb = async () => {
    const user = myauth.currentUser;

    const updateDb = async () => {
      const data2 = await setDoc(
        doc(db, "Users", user.uid),
        {
          email,
          firstName,
          lastName,
          created: serverTimestamp(),
        },
        { merge: true }
      );
    };
    await updateDb().catch(console.error);
  };

  const handleSignUp = async () => {
    if (!signIn) {
      try {
        await signup(email, password);
        router.push({
          pathname: "/",
          query: {
            firstName: firstName,
            lastName: lastName,
          },
        });
      } catch (error) {
        console.log(">>>>>", error);
        setError("Please Fill In All Fields");
      }
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
            {/* <Link
              href={{
                pathname: '/dashboard',
              }}
            > */}
            <button
              onClick={handleLogin}
              className="flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border"
            >
              Sign In
            </button>
            {/* </Link> */}
            {error && (
              <div className="w-full max-w-[40ch] border-red-300 text-red-300 py-2 text-center border border-solid mt-5">
                {error}
              </div>
            )}
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
            {/* <Link
              href={{
                pathname: '/dashboard',
                query: {
                  firstName: firstName,
                  lastName: lastName,
                },
              }}
            > */}
            <button
              onClick={async () => {
                await handleSignUp();
                saveToDb();
              }}
              className="flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border"
            >
              Sign Up
            </button>
            {/* </Link> */}
            {error && (
              <div className="w-full max-w-[40ch] border-red-300 text-red-300 py-2 text-center border border-solid mt-5">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
