import { CldImage } from "next-cloudinary";
import Trash from "@/components/icons/Trash.js";
import { cartProductPrice } from "@/components/AppContext";

function CartProduct({ product, onRemove, i }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <CldImage
          className="rounded-md"
          width="200"
          height="200"
          src={product.imageId || "food"}
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
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(i)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
export default CartProduct;
