"use client";

import DeleteButton from "@/components/DeleteButton";
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
    // setEditedCategory(null);
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
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
            <div className="flex pb-2 gap-2">
              <button type="submit">
                {editedCategory ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setCategoryName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={categories.indexOf(c) + 1}
              className=" bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <DeleteButton onDelete={() => handleDeleteClick(c._id)} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
export default CategoriesPage;
