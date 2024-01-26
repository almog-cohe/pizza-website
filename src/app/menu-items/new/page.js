"use client";

import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

function NewMenuItemPage() {
  const [redirectToItem, setRedirectToItem] = useState(false);

  const { loading, data } = useProfile();

  async function handleFormSubmit(e, data) {
    e.preventDefault();
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
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
export default NewMenuItemPage;
