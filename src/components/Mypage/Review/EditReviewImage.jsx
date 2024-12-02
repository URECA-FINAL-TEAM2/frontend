import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";

const EditReviewImage = ({ images, handleImageDelete, handleImageAdd }) => {
  return (
    <div className="mb-4 flex flex-wrap">
      {images.map((img, index) => (
        <div key={index} className="relative my-2 mr-2 w-[100px]">
          <img className="h-[100px] w-[100px] rounded-xl" src={img} alt={`review-${index}`} />
          <button
            onClick={() => handleImageDelete(index)}
            className="absolute right-2 top-2 rounded-full text-xs text-white"
          >
            <MdOutlineClose color={"black"} size={20} />
          </button>
        </div>
      ))}
      <label className="mb-2 mr-2 flex cursor-pointer items-end justify-center rounded-xl p-2">
        <span className="text-gray-500">
          <CiCirclePlus size={30} />
          <input type="file" multiple accept="image/*" onChange={handleImageAdd} className="hidden" />
        </span>
      </label>
    </div>
  );
};

export default EditReviewImage;
