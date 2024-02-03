import { CldImage } from "next-cloudinary";
import AddToCartButton from "./AddToCartButton";

function MenuItemTile({ onAddToCart, ...item }) {
  const { imageId, description, name, basePrice, size, extraIngredientPrices } =
    item;
    const hasSizeOrExtras = size?.length > 0 || extraIngredientPrices?.length > 0
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-[0_1px_8px_0px_rgba(0,0,0,0.5)]">
      <div>
        <CldImage
          className="rounded-md"
          width="20000"
          height="20000"
          src={imageId}
          alt="item"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
     <AddToCartButton hasSizeOrExtras={hasSizeOrExtras} onClick={onAddToCart} basePrice={basePrice} />
    </div>
  );
}
export default MenuItemTile;
