import { useEffect, useState } from "react";
import "../../../css/styles.css";
import { useParams } from "react-router-dom";
import SubHeader from "../../../components/common/SubHeader";
import Modal from "../../../components/common/modal/modal";
import PetForm from "@/components/Mypage/Pet/PetForm";
import { deletePetInfo, getDogBreed, getPetInfo, updatePetInfo } from "@/queries/petQuery";
import useAuthStore from "@/store/authStore";
import useToastAndNavigate from "@/hooks/CustomerSearch/useToastAndNavigate";

// 반려견 등록, 조회, 수정, 삭제(CRUD)
const MyPet = () => {
  const showToastAndNavigate = useToastAndNavigate();
  const { id } = useAuthStore();
  const params = useParams();
  const [dogId, setDogId] = useState();
  const [isState, setIsState] = useState("register");
  const [breed, setBreed] = useState([]);
  const [onlyRead, setOnlyRead] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dogName: "",
    dogBreedCodeId: "",
    dogWeight: "",
    dogBirth: { year: "년", month: "월", day: "일" },
    dogGender: "",
    neutering: "",
    experience: "",
    significant: "",
    profileImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = (state) => {
    setIsModalOpen(true);
    setIsState(state);
  };

  const handleConfirmModal = async () => {
    setIsModalOpen(false);
    if (isState === "update") {
      await updatePetInfo(id, dogId, formData, "update");
      showToastAndNavigate("수정이 완료되었습니다.", "👏🏻");
    } else if (isState === "register") {
      await updatePetInfo(id, dogId, formData, "register");
      showToastAndNavigate("등록 완료되었습니다.", "👏🏻");
    } else {
      await deletePetInfo(dogId, id);
      showToastAndNavigate("삭제 완료되었습니다.", "👏🏻");
    }
    setOnlyRead(true);
  };

  const getPet = async (dogId) => {
    try {
      const response = await getPetInfo(dogId, id);
      setFormData((prev) => ({
        ...prev,
        profileImage: response.dogProfileImage,
        ...response
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDogId(params.id);
    if (params.id != null) {
      setIsState("update");
      getPet(params.id);
    } else {
      setIsState("register");
      setOnlyRead(false);
    }
  }, [params]);

  useEffect(() => {
    const getBreed = async () => {
      const response = await getDogBreed();
      setBreed(response);
    };
    getBreed();
  }, []);

  return (
    <>
      <div>
        {isState === "register" ? <SubHeader title={"반려견 등록"} /> : <SubHeader title={"반려견 정보"} />}

        <PetForm
          breed={breed}
          onlyRead={onlyRead}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        {isState != "register" && (
          <div className="mb-28 mt-3 text-center text-xs">
            <button type="button" onClick={() => handleOpenModal("delete")} className="text-gray-300 underline">
              반려견 삭제하기
            </button>
          </div>
        )}

        {onlyRead ? (
          <button type="button" onClick={() => setOnlyRead(false)} className="bottomButtonPink">
            반려견 정보수정
          </button>
        ) : isState == "register" ? (
          <button type="button" onClick={() => handleOpenModal("register")} className="bottomButtonPink">
            반려견 정보등록
          </button>
        ) : (
          <button type="button" onClick={() => handleOpenModal("update")} className="bottomButtonPink">
            반려견 정보수정 완료
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModal}
        closeText="닫기"
        confirmText="확인"
      >
        {(() => {
          if (isState === "update") {
            return <>반려견 정보를 수정하시겠습니까?</>;
          } else if (isState === "register") {
            return <>반려견 정보를 등록하시겠습니까?</>;
          } else {
            return <>반려견을 삭제하시겠습니까?</>;
          }
        })()}
      </Modal>
    </>
  );
};

export default MyPet;
