import { useState } from "react";
import testImg from "/Test/dog.jpg";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import SubHeader from "@/components/common/SubHeader";
import { insertGroomerPortfolio } from "@/queries/shopQuery";
import { useNavigate } from "react-router-dom";

const EditPortfolio = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([testImg, testImg, testImg]);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (index === images.indexOf(selectedImage)) {
      setSelectedImage(null); // 삭제한 이미지가 선택된 이미지라면 초기화
    }
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleCompleteImage = async () => {
    const response = await insertGroomerPortfolio(images, 1);
    navigate("/groomer/mystore");
  };

  const handleImageClick = (img) => {
    setSelectedImage(img); // 클릭된 이미지를 선택
  };

  return (
    <>
      <SubHeader title={"포트폴리오 수정"} />
      <div className="mx-auto mt-[75px] flex min-h-screen w-10/12 flex-col items-center">
        {/* 이미지 영역 */}
        <div className="my-3 flex h-[300px] w-full items-center justify-center border border-gray-200">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="h-full max-h-[300px] object-contain" />
          ) : (
            <p className="text-center text-gray-400">
              이미지 미리보기
              <p className="text-xs">이미지를 클릭하면 여기에 표시됩니다.</p>
            </p>
          )}
        </div>

        {/* 이미지 리스트 */}
        <div className="mx-auto mb-20 grid grid-cols-3">
          {images.map((img, index) => (
            <div key={index} className="relative mx-auto my-2 w-[100px]">
              <img
                className="mx-auto h-[100px] w-[100px] cursor-pointer rounded-md text-center"
                src={img}
                alt={`review-${index}`}
                onClick={() => handleImageClick(img)} // 클릭 이벤트 추가
              />
              <button
                onClick={() => handleImageDelete(index)}
                className="absolute right-2 top-2 rounded-full text-xs text-white"
              >
                <MdOutlineClose color={"black"} size={20} />
              </button>
            </div>
          ))}
          {Array.from({ length: 9 - images.length }).map((_, index) => (
            <label
              key={index}
              className="m-2 flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-xl border border-gray-200"
            >
              <span className="text-gray-200">
                <CiCirclePlus size={30} />
                <input type="file" multiple accept="image/*" onChange={handleImageAdd} className="hidden" />
              </span>
            </label>
          ))}
        </div>
      </div>
      <button onClick={handleCompleteImage} className="bottomButtonPink">
        수정완료
      </button>
    </>
  );
};

export default EditPortfolio;
