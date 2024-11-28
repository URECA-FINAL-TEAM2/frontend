import SubHeader from "../../components/common/SubHeader";
import { useEffect, useState } from "react";
import Modal from "../../components/common/modal/modal";
import "../../css/styles.css";
import PetBirth from "../../components/Mypage/Pet/PetBirth";
import PetGender from "../../components/Mypage/Pet/PetGender";
import PetNeutering from "../../components/Mypage/Pet/PetNeutering";
import PetExperienced from "../../components/Mypage/Pet/PetExperienced";
import PetProfileImage from "../../components/Mypage/Pet/PetProfileImage";
import { useParams } from "react-router-dom";

const MyPet = () => {
  const params = useParams();
  const [isState, setIsState] = useState("register"); // register(등록), update(수정), delete(삭제)
  const [onlyRead, setOnlyRead] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dogName: "",
    breed: "",
    dogWeight: "",
    dogBirth: { year: "년", month: "월", day: "일" },
    dogGender: "",
    neutering: "",
    experienced: "",
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

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    if (isState === "update") {
      console.log("수정완료");
    } else if (isState === "register") {
      console.log("등록완료");
    } else {
      console.log("삭제완료");
    }
    setOnlyRead(true);
  };

  useEffect(() => {
    if (params.id != null) {
      // 정보 조회 페이지
      setIsState("update");
      console.log("조회 API 요청하고 값 채우기");
    } else {
      // 정보 등록 페이지
      setIsState("register");
      setOnlyRead(false);
    }
  }, []);

  return (
    <>
      <div>
        {isState === "register" ? <SubHeader title={"반려견 등록"} /> : <SubHeader title={"반려견 정보"} />}

        <form className="mb-28">
          <PetProfileImage onlyRead={onlyRead} setFormData={setFormData} />
          <div>
            <label className="labelStyle" htmlFor="dogName">
              반려견 이름
            </label>
            {onlyRead ? (
              <div className="inputStyle h-[33px]">{formData.dogName}</div>
            ) : (
              <input
                className="inputStyle border-b-main-200"
                type="text"
                id="dogName"
                name="dogName"
                value={formData.dogName}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <div>
            <label className="labelStyle" htmlFor="breed">
              품종
            </label>
            {onlyRead ? (
              <div className="inputStyle h-[33px]">{formData.breed}</div>
            ) : (
              <input
                className="inputStyle border-b-main-200"
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <div>
            <label className="labelStyle" htmlFor="dogWeight">
              몸무게(kg)
            </label>
            {onlyRead ? (
              <div className="inputStyle h-[33px]">{formData.dogWeight}</div>
            ) : (
              <input
                className="inputStyle border-b-main-200"
                type="text"
                id="dogWeight"
                name="dogWeight"
                value={formData.dogWeight}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <PetBirth onlyRead={onlyRead} formData={formData} setFormData={setFormData} />
          <PetGender onlyRead={onlyRead} formData={formData} setFormData={setFormData} />
          <PetNeutering onlyRead={onlyRead} formData={formData} setFormData={setFormData} />
          <PetExperienced onlyRead={onlyRead} formData={formData} setFormData={setFormData} />

          <div>
            <label className="labelStyle" htmlFor="significant">
              특이사항
            </label>
            {onlyRead ? (
              <div className="inputStyle h-[33px]">{formData.significant}</div>
            ) : (
              <textarea
                className="inputStyle border-b-main-200"
                id="significant"
                name="significant"
                value={formData.significant}
                onChange={handleChange}
              />
            )}
          </div>

          {isState != "register" && (
            <div className="mt-12 text-center text-sm">
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
        </form>
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
          }
          if (isState === "register") {
            return <>반려견 정보를 등록하시겠습니까?</>;
          }
          if (isState === "delete") {
            return <>반려견을 삭제하시겠습니까?</>;
          }
          return null;
        })()}
      </Modal>
    </>
  );
};

export default MyPet;
