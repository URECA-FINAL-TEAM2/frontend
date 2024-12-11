import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";

const EditReviewImage = ({ images, handleImageDelete, handleImageAdd }) => {
  return (
    <div className="mb-4 grid grid-cols-3">
      {images.map((img, index) => (
        <div key={index} className="relative mx-auto my-2 w-[100px]">
          <img className="mx-auto h-[100px] w-[100px] rounded-xl text-center" src={img} alt={`review-${index}`} />
          <button
            onClick={() => handleImageDelete(index)}
            className="absolute right-2 top-2 rounded-full text-xs text-white"
          >
            <MdOutlineClose color={"black"} size={20} />
          </button>
        </div>
      ))}
      {images.length < 3 && (
        <label className="m-2 flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-xl border border-gray-200">
          <span className="text-gray-200">
            <CiCirclePlus size={30} />
            <input type="file" multiple accept="image/*" onChange={handleImageAdd} className="hidden" />
          </span>
        </label>
      )}
    </div>
  );
};

export default EditReviewImage;
