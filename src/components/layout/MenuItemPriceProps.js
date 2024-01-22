import Trash from "@/components/icons/Trash.js";
import Plus from "@/components/icons/Plus.js";
import ChevronDown from "@/components/icons/ChevronDown.js";
import ChevronUp from "@/components/icons/ChevronUp.js";
import { useState } from "react";

function MenuItemPriceProps({ props, setProps, name, addLabel }) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(e, index, prop) {
    const newValue = e.target.value;
    setProps((oldSizes) => {
      const newSizes = [...oldSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex p-1 gap-2 border-none"
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex gap-2 max-w-xs">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(e) => editProp(e, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(e) => editProp(e, index, "price")}
                />
              </div>
              <div>
                &nbsp;
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-amber-50 flex justify-center items-center gap-1"
        >
          <Plus />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
export default MenuItemPriceProps;
