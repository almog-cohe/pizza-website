import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";

function EditableImage({ link, setLink }) {
  return (
    <div className="bg-gray-50 p-1 rounded-md">
      <div className="flex justify-center m-2">
        {link && (
          <CldImage width="100" height="100" src={link} alt="No image" />
        )}
        {!link && <div>No image</div>}
      </div>
      <label>
        <CldUploadButton
          className="text-gray-500 font-thin rounded-lg p-0"
          options={{
            multiple: false,
          }}
          onUpload={(result) => {
            setLink(result.info.public_id);
          }}
          uploadPreset="jsdc6csm"
        >
          Edit
        </CldUploadButton>
      </label>
    </div>
  );
}
export default EditableImage;
