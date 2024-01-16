import Image from "next/image";

function EditableImage({ link, setLink }) {
  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  }

  return (
    <div className="bg-gray-50 p-1 rounded-md">
      <div className="flex justify-center m-2">
        {link && (
          <Image
            src={link}
            className="rounded"
            width={80}
            height={80}
            alt={"Item photo"}
          />
        )}
        {!link && <div>No image</div>}
      </div>
      <label>
        <input type="file" hidden onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg text-center cursor-pointer">
          Edit
        </span>
      </label>
    </div>
  );
}
export default EditableImage;
