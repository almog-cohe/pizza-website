"use client";

import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CategoriesPage() {
  const [CategoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories);
      });
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: CategoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      response.ok ? resolve() : reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error!",
    });
    setEditedCategory(null);
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleCategorySubmit} className="mt-8">
        <div className="flex gap-2">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <label>&nbsp;</label>
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <button
              key={categories.indexOf(c) + 1}
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              className="rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
}
export default CategoriesPage;
