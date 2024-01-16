"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs.js";

function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  // const [saved, setSaved] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  const [phone, setPhone] = useState("");
  const [srteetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetch] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.srteetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetch(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    // setSaved(false);
    // setIsSaving(true);
    const savingPromise = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        srteetAddress,
        phone,
        postalCode,
        city,
        country,
      }),
    }).catch(new Error("Error"));

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error saving",
    });
  }

  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image;

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        {/* {saved && (
          <h2 className="text-center bg bg-green-100 p-4 rounded-lg border  border-green-300">
            Profile saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg bg-sky-100 p-4 rounded-lg border  border-sky-300">
            Saving...
          </h2>
        )} */}
        <div className="flex gap-2">
          <div>
            <div className="bg-gray-50 p-1 rounded-md">
              <div className="flex justify-center m-2">
                <Image
                  src={userImage}
                  className="rounded"
                  width={80}
                  height={80}
                  alt={"avatar"}
                />
              </div>
              <label>
                <input type="file" hidden onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg text-center cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form
            id="profileForm"
            className="grow"
            onSubmit={handleProfileInfoUpdate}
          >
            <label>First and last name</label>
            <input
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input type="email" disabled value={session.data.user.email} />
            <label>Phone number</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Street address</label>
            <input
              type="text"
              placeholder="Street address"
              value={srteetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>Postal code</label>
                <input
                  type="text"
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default ProfilePage;
