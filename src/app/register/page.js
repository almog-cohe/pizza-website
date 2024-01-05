"use client";
import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import {signIn} from "next-auth/react";


function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false)

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setUserCreated(false)
    setError(false)
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setUserCreated(true)
      } else {
        setError(true)
      }
      setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created.<br />
          Now you can <Link href={"/login"} className="underline">Login &raquo;</Link>
        </div>
      )}
      {error && (
          <div className="my-4 text-center">
            An error occurred.<br />
            Please try again later.
         </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center">
          <Image
            src={"/google.png"}
            alt="google"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          Login with google
        </button>
        <div className="text-center my-6 text-gray-500 border-t pt-4">
          Existing account? <Link className="underline" href={'/login'}>Login here &raquo;</Link>
        </div>
      </form>
    </section>
  );
}
export default RegisterPage;
