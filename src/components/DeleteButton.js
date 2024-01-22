import { useState } from "react";

function DeleteButton({ onDelete, className }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="bg-black/80 fixed inset-0 flex justify-center items-center">
        <div className="bg-slate-50 rounded-xl p-2">
          <div className="mb-4">Are you sure you want to delete?</div>
          <div className="flex gap-2">
            <button onClick={() => setShowConfirm(false)} type="button">
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(), setShowConfirm(false);
              }}
              className="bg-red-200"
              type="button"
            >
              Delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button className={className} onClick={() => setShowConfirm(true)}>
      Delete
    </button>
  );
}
export default DeleteButton;
