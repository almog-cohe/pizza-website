function MenuItem() {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-[0_1px_8px_0px_rgba(0,0,0,0.5)]">
        <div>
          <img src="/pizza.png" alt="pizza" />
        </div>
        <h4 className="font-semibold text-xl my-3">pepperoni pizza</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit quidem
          rerum enim est quos.
        </p>
        <button className="bg-primary text-white rounded-full mt-4 px-8 py-2 border-none">
          Add to cart 12$
        </button>
      </div>
    </>
  );
}
export default MenuItem;
