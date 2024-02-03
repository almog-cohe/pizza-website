"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Trash from "@/components/icons/Trash.js";
import AddressInputs from "@/components/layout/AddressInputs";
import useProfile from "@/components/UseProfile";

function CartPage() {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState({})
  const {data:profileData} = useProfile()

  useEffect(() => {
    if (profileData) {
      const { phone, srteetAddress, postalCode, city, country } = profileData
      const addressFromProfile = { phone, srteetAddress, postalCode, city, country }
      setAddress(addressFromProfile)
    }
  }, [profileData])

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}))
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, i) => (
              <div
                key={i + 1}
                className="flex items-center gap-4 border-b py-4"
              >
                <div className="w-24">
                  <CldImage
                    className="rounded-md"
                    width="200"
                    height="200"
                    src={product.imageId}
                    alt={product.name + " image"}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-900">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div>
                      {product.extras.map((extra, i) => (
                        <div className="text-sm text-gray-700" key={i + 1}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProducts(i)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 text-right pr-16">
            <span className=" text-gray-500">Subtotal:</span>{" "}
            <span className="text-lg font-semibold">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h2>Checkout</h2>
          <form>
            <AddressInputs addressProps={address}
            setAddressProps={handleAddressChange} />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default CartPage;
