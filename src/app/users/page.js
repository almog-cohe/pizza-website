"use client";

import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import Link from "next/link";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("api/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg mb-2 px-4 py-1 flex items-center gap-4"
            >
              <div className="grid grid-cols-3 grow">
                <div className="text-gray-900">
                  {user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
export default UsersPage;
