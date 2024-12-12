import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import SubHeader from "@/components/common/SubHeader";
import { insertGroomerPortfolio } from "@/queries/shopQuery";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@/components/common/modal/modal";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/authStore";

const EditPortfolio = () => {
  const { id } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { portfolioImg } = location.state || {};
  const [images, setImages] = useState([]);
  const [rawImages, setRawImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setRawImages((prevRawImages) => prevRawImages.filter((_, i) => i !== index));

    if (index === images.indexOf(selectedImage)) {
      setSelectedImage(null);
    }
  };
  const handleImageAdd = (e) => {
    const file = e.target.files[0]; // 선택한 첫 번째 파일 가져오기
    if (file) {
      const imageURL = URL.createObjectURL(file); // 미리보기 URL 생성

      // 상태 업데이트
      setImages((prevImages) => [...prevImages, imageURL]);
      setRawImages((prevRawImages) => [...prevRawImages, file]);

      e.target.value = "";
    }
  };

  const handleCompleteImage = async () => {
    const response = await insertGroomerPortfolio(rawImages, id);

    toast("수정이 완료되었습니다.", { icon: "👏🏻" });

    setTimeout(() => {
      navigate("/groomer/mystore");
    }, 1500);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img); // 클릭된 이미지를 선택
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (state) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setImages(portfolioImg);
    setRawImages(portfolioImg);
  }, []);

  return (
    <>
      <SubHeader title={"포트폴리오 수정"} />
      <div className="mx-auto mt-[75px] flex min-h-screen w-10/12 flex-col items-center">
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

        <div className="mx-auto mb-20 grid grid-cols-3 gap-x-2">
          {images.map((img, index) => (
            <div key={index} className="relative mx-auto my-2 w-[100px]">
              <img
                className="mx-auto h-[100px] w-[100px] cursor-pointer rounded-md text-center"
                src={img}
                alt={`review-${index}`}
                onClick={() => handleImageClick(img)}
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
      <button onClick={handleOpenModal} className="bottomButtonPink">
        수정완료
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCompleteImage}
        closeText="닫기"
        confirmText="확인"
      >
        포트폴리오를 수정하시겠습니까?
      </Modal>
      <Toaster />
    </>
  );
};

export default EditPortfolio;
