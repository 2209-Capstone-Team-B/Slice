import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { db, provider, auth } from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup } from "firebase/auth";
import Image from "next/image";

const AuthPage = () => {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  const images = ["custom-img", "custom-img2", "custom-img3"];

  const autoScroll = true;
  let slideInterval;

  const autoSlide = () => {
    slideInterval = setInterval(nextSlide, 4100);
  };

  const nextSlide = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  useEffect(() => {
    if (autoScroll) {
      autoSlide();
    }
    return () => clearInterval(slideInterval);
  }, [currentImage]);

  const { currentUser, login, signup } = useAuth();
  const myauth = getAuth();

  useEffect(() => {
    if (currentUser) router.push("/dashboard");
  }, [currentUser]);

  const handleClick = () => {
    setSignIn(!signIn);
  };

  const handleLogin = async () => {
    if (signIn) {
      try {
        await login(email, password);
      } catch (error) {
        setError("Incorrect Email or Password");
      }
    }
  };

  //
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const saveToDb = async () => {
    const user = myauth.currentUser;

    const updateDb = async () => {
      await setDoc(
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
      } catch (error) {
        if (password.length < 6) {
          setError("Password Needs to be at least 6 characters");
        } else if (error) {
          setError("Email already in use");
        } else {
          setError("Please Fill In All Fields");
        }
      }
    }
  };

  const GoogleSignIn = async () => {
    await signInWithPopup(auth, provider).catch(alert);

    const user = myauth.currentUser;
    if (user) router.push("/dashboard");

    const updateDb = async () => {
      let names = user.displayName.split(" ");
      await setDoc(
        doc(db, "Users", user.uid),
        {
          email: user.email,
          firstName: names[0],
          lastName: names[1],
          created: serverTimestamp(),
        },
        { merge: true }
      );
    };
    await updateDb().catch(console.error);
  };

  return (
    <div
      className={`flex items-center justify-center sm:h-screen mb-0 bg-center bg-cover ${
        currentImage === 0 && "custom-img"
      } ${currentImage === 1 && "custom-img1"} ${
        currentImage === 2 && "custom-img2"
      } border`}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] object-top">
        <Link href="/">
          <h1 className="text-5xl sm:text-9xl antialiased font-serif-thin p-10 flex justify-center items-center hover:text-green-200">
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
                onKeyPress={handleKeypress}
              />
            </div>
            <div className="flex justify-center items-center p-6 text-black">
              <input
                type="password"
                value={password}
                placeholder="Password..."
                className="rounded-3xl p-3"
                onChange={(event) => setPassword(event.target.value)}
                onKeyPress={handleKeypress}
              />
            </div>
            <button
              onClick={handleLogin}
              className="flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border"
            >
              Sign In
            </button>
            <div className="flex justify-center">
              <button
                onClick={async () => {
                  await GoogleSignIn();
                }}
              >
                <Image
                  src="/btn_google_signin_light_pressed_web.png"
                  alt=""
                  width="200"
                  height="200"
                  unoptimized
                />
              </button>
            </div>
            <Link
              href="/passwordReset"
              className="flex justify-center text-gray-300 hover:text-green-200 focus:text-green-200 active:text-green-800 duration-200 transition ease-in-out"
            >
              Forgot your password?
            </Link>
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

            <button
              onClick={async () => {
                await handleSignUp();
                saveToDb();
              }}
              className="flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border"
            >
              Sign Up
            </button>
            <div className="flex justify-center">
              <button
                onClick={async () => {
                  await GoogleSignIn();
                }}
              >
                <Image
                  src="/btn_google_signin_light_pressed_web.png"
                  alt="Loading"
                  width="200"
                  height="200"
                  unoptimized
                />
              </button>
            </div>
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
