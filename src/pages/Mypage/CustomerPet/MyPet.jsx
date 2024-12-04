import { useEffect, useState } from "react";
import "../../../css/styles.css";
import { useParams } from "react-router-dom";
import SubHeader from "../../../components/common/SubHeader";
import Modal from "../../../components/common/modal/modal";
import PetForm from "@/components/Mypage/Pet/PetForm";
import { getPetInfo, putPetInfo } from "@/queries/petQuery";

// 반려견 등록,조회,수정,삭제(CRUD)
const MyPet = () => {
  const params = useParams();
  const [isState, setIsState] = useState("register");
  const [onlyRead, setOnlyRead] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dogIg: 0,
    dogName: "멍멍",
    breed: "",
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

  const handleUpdate = () => {
    setOnlyRead(false);
    console.log(formData);
  };
  const handleOpenModal = (state) => {
    setIsModalOpen(true);
    setIsState(state);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = async () => {
    setIsModalOpen(false);
    if (isState === "update") {
      const response = await putPetInfo(2, formData);
      console.log("펫 수정", response);
    } else if (isState === "register") {
      console.log("등록완료");
    } else {
      console.log("삭제완료");
    }
    setOnlyRead(true);
  };

  const getPet = async (id) => {
    try {
      const response = await getPetInfo(id);
      console.log("반려견 정보 조회", response);
      setFormData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id != null) {
      // 정보 조회 페이지
      setIsState("update");
      getPet(2);
    } else {
      // 정보 등록 페이지
      setIsState("register");
      setOnlyRead(false);
    }
  }, [params]);

  return (
    <>
      <div>
        {isState === "register" ? <SubHeader title={"반려견 등록"} /> : <SubHeader title={"반려견 정보"} />}

        <PetForm
          onlyRead={onlyRead}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleOpenModal={handleOpenModal}
          handleUpdate={handleUpdate}
          isState={isState}
        />

        {isState != "register" && (
          <div className="mb-28 mt-12 text-center text-sm">
            <button type="button" onClick={() => handleOpenModal("delete")} className="text-gray-300 underline">
              반려견 삭제하기
            </button>
          </div>
        )}

        {onlyRead ? (
          <button type="button" onClick={handleUpdate} className="bottomButtonPink">
            반려견 정보 수정하기
          </button>
        ) : isState == "register" ? (
          <button type="button" onClick={() => handleOpenModal("register")} className="bottomButtonPink">
            반려견 정보 등록하기
          </button>
        ) : (
          <button type="button" onClick={() => handleOpenModal("update")} className="bottomButtonPink">
            반려견 정보 수정완료
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
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
