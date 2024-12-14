import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import SubHeader from "@/components/common/SubHeader";
import { getGroomerShop, insertGroomerPortfolio } from "@/queries/shopQuery";
import Modal from "@/components/common/modal/modal";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const EditPortfolio = () => {
  const navigate = useNavigate();
  const { id } = useAuthStore();
  const [images, setImages] = useState([]);
  const [rawImages, setRawImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      setImages((prevImages) => [...prevImages, imageURL]);
      setRawImages((prevRawImages) => [...prevRawImages, file]);

      e.target.value = "";
    }
  };

  const handleCompleteImage = async () => {
    try {
      await insertGroomerPortfolio(rawImages, id);
      setIsModalOpen(false);
      toast("수정 완료되었습니다.", {
        icon: "👏🏻"
      });

      setTimeout(() => {
        navigate(-1);
      }, 500);
    } catch (error) {
      console.error(error);
      toast("담당자에게 문의하세요", {
        icon: "❌"
      });

      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
  };

  useEffect(() => {
    const getShop = async () => {
      try {
        const response = await getGroomerShop(id);

        setImages(response.data.groomerPortfolioImages);
        setRawImages(response.data.groomerPortfolioImages);
      } catch (error) {
        console.error(error);
      }
    };
    getShop();
  }, []);

  return (
    <>
      <SubHeader title={"포트폴리오 수정"} />
      <div className="mx-auto mt-[70px] flex min-h-screen w-10/12 flex-col items-center">
        <div className="flex h-[250px] w-full items-center justify-center border border-gray-200">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="h-full max-h-[250px] object-contain" />
          ) : (
            <p className="text-center text-gray-400">
              이미지 미리보기
              <p className="text-xs">이미지를 클릭하면 여기에 표시됩니다.</p>
            </p>
          )}
        </div>
        <div className="mt-7 flex w-full items-center justify-start text-xs text-gray-300">
          <BsInfoCircle className="mr-1" />
          이미지는 최대 9장 선택할 수 있습니다.
        </div>
        <div className="mx-auto mb-20 mt-1 grid grid-cols-3 gap-x-2">
          {images.map((img, index) => (
            <div key={index} className="relative mx-auto my-2 w-[100px]">
              <img
                className="mx-auto h-[100px] w-[100px] cursor-pointer rounded-md text-center"
                src={img}
                alt={`review-${index}`}
                onClick={() => setSelectedImage(img)}
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
              className="m-2 flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-xl border border-[#ccc]"
            >
              <span className="text-[#ccc]">
                <CiCirclePlus size={30} />
                <input type="file" multiple accept="image/*" onChange={handleImageAdd} className="hidden" />
              </span>
            </label>
          ))}
        </div>
      </div>
      <button onClick={() => setIsModalOpen(true)} className="bottomButtonPink">
        수정완료
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
