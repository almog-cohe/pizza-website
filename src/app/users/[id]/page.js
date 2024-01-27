"use client";

import useProfile from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditUserPage() {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);

  async function handleSaveButtonClick(e, data) {
    e.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      res.ok ? resolve() : reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "Error!",
    });
  }

  if (loading) {
    return "Loading user profile...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
export default EditUserPage;
