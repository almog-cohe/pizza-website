"use client";

import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage.js";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";

function NewMenuItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItem, setRedirectToItem] = useState(false);

  const { loading, data } = useProfile();

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = { name, description, basePrice };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this item",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItem(true);
  }

  if (redirectToItem) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link className="button" href={"/menu-items"}>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div className="flex gap-4">
          <div>
            <EditableImage />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Base price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
export default NewMenuItemPage;
