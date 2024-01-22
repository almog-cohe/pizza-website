"use client";

import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm.js";
import DeleteButton from "@/components/DeleteButton.js";

function EditMenuItemPage() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItem, setRedirectToItem] = useState(false);

  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
  }, []);

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
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
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-4 flex">
        <div className="mx-12">&nbsp;&nbsp;&nbsp;</div>
        <div className="grow">
          <DeleteButton
            className="bg-red-200 border-none"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}
export default EditMenuItemPage;
