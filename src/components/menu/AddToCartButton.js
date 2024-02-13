function AddToCartButton({ hasSizeOrExtras, onClick, basePrice }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary text-white rounded-full mt-4 px-8 py-2 border-none"
    >
      {hasSizeOrExtras ? (
        <span>Add to cart (from ${basePrice})</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
}
export default AddToCartButton;
