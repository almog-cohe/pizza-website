"use client";

import { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import useProfile from "../UseProfile";
import AddressInputs from "./AddressInputs";

function UserForm({ user, onSave, userImage }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [srteetAddress, setStreetAddress] = useState(user?.srteetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [imageId, setImageId] = useState(
    user?.imageId || "re4hdsbv5pwfn2ccgsxm"
  );
  const [admin, setAdmin] = useState(user?.admin || false);

  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value)
    if (propName === 'srteetAddress') setStreetAddress(value)
    if (propName === 'postalCode') setPostalCode(value)
    if (propName === 'city') setCity(value)
    if (propName === 'country') setCountry(value)
  }

  return (
    <div className="flex gap-2">
      <div>
        <div className="bg-gray-50 p-1 rounded-md">
          <div className="flex justify-center m-2">
            {imageId ? (
              <CldImage width="140" height="140" src={imageId} alt="Avatar" />
            ) : (
              // now it's not available because imageId default image
              <Image width="140" height="140" src={userImage} alt="Avatar" />
            )}
          </div>
          <label>
            <CldUploadButton
              className="text-gray-500 font-thin rounded-lg p-0"
              options={{
                multiple: false,
              }}
              onUpload={(result) => {
                setImageId(result.info.public_id);
              }}
              uploadPreset="jsdc6csm"
            >
              Edit
            </CldUploadButton>
          </label>
        </div>
      </div>
      <form
        id="profileForm"
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            srteetAddress,
            phone,
            postalCode,
            city,
            country,
            imageId,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input type="email" disabled value={user.email} />
        <AddressInputs
          addressProps={{ phone, srteetAddress, postalCode, city, country }} setAddressProps={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className=" select-none inline-flex gap-2 items-center mb-2 p-2"
              htmlFor="adminCb"
            >
              <input
                checked={admin}
                onClick={() => setAdmin(!admin)}
                id="adminCb"
                type="checkbox"
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
export default UserForm;
