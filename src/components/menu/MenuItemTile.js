import { CldImage } from "next-cloudinary";

function MenuItemTile({ onAddToCart, ...item }) {
  const { imageId, description, name, basePrice, size, extraIngredientPrices } =
    item;
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
      <button
        type="button"
        onClick={onAddToCart}
        className="bg-primary text-white rounded-full mt-4 px-8 py-2 border-none"
      >
        {size?.length > 0 || extraIngredientPrices?.length > 0 ? (
          <span>Add to cart (from ${basePrice})</span>
        ) : (
          <span>Add to cart ${basePrice}</span>
        )}
      </button>
    </div>
  );
}
export default MenuItemTile;
