import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";

function EditableImage({ link, setLink }) {
  return (
    <div className="bg-gray-50 p-1 rounded-md">
      <div className="flex justify-center m-2 md:max-w-32 md:h-auto">
        {link && (
          <CldImage width="1024" height="1024" src={link} alt="No image" />
        )}
        {!link && <div>No image</div>}
      </div>
      <label>
        <CldUploadButton
          className="text-gray-600 font-thin rounded-lg p-0"
          options={{
            multiple: false,
          }}
          onUpload={(result) => {
            setLink(result.info.public_id);
          }}
          uploadPreset="jsdc6csm"
        >
          Edit image
        </CldUploadButton>
      </label>
    </div>
  );
}
export default EditableImage;
