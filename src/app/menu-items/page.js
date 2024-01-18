"use client";

import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";


function MenuItemsPage() {

  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((menuItems) => setMenuItems(menuItems));
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>
          Create new menu item
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit new item</h2>
        {menuItems?.length > 0 &&
          menuItems.map((item) => (
            <button key={menuItems.indexOf(item) + 1} className="mb-1">
              {item.name}
            </button>
          ))}
      </div>
    </section>
  );
}
export default MenuItemsPage;
