import { CldImage } from "next-cloudinary";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile.js";

function MenuItem(menuItem) {
  const {
    imageId,
    name,
    description,
    basePrice,
    sizes,
    extraIngredientPrices,
  } = menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);

    setShowPopup(false);
    toast.success("Added to cart!");
  }

  function handleExtraThingClick(e, extraThing) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((extra) => extra.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-50 p-1 rounded-lg max-w-md"
          >
            <div
              className="p-3 overflow-y-scroll"
              style={{ maxHeight: "calc(100vh - 50px)" }}
            >
              <div className="w-72 h-auto mx-auto">
                <CldImage
                  className="rounded-md mx-auto"
                  width="1024"
                  height="1024"
                  src={imageId || "food"}
                  alt={name}
                  priority
                />
              </div>
              <h2 className="text-lg text-center font-bold mb-2">{name}</h2>
              <p className="text-center text-gray-600 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size, i) => (
                    <label
                      key={i + 1}
                      className="flex gap-2 p-4 rounded-md border mb-1"
                    >
                      <input
                        type="radio"
                        name="size"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />{" "}
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing, i) => (
                    <label
                      key={i + 1}
                      className="flex gap-2 p-4 rounded-md border mb-1"
                    >
                      <input
                        type="checkbox"
                        name={extraThing.name}
                        onChange={(e) => handleExtraThingClick(e, extraThing)}
                      />
                      {extraThing.name} ${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-0"
                type="button"
              >
                Add to cart ${selectedPrice}
              </button>
              <button className="mt-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
export default MenuItem;
