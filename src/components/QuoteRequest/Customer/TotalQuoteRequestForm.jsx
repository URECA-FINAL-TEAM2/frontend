import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import RegionSelectModal from "../../common/modal/RegionSelectModal";
import PetSelectModal from "../PetSelectModal";
import { Region, Schedule, Corgi, Note, Photos } from "/public/Icons";

const TotalQuoteRequestForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [attachedImages, setAttachedImages] = useState([]);
  const [petInfo, setPetInfo] = useState(null);

  const [isLocationModalOpen, SetIsLocationModalOpen] = useState(false);
  // TODO : 지역 초기값 설정 (GET API Request)
  const [location, setLocation] = useState(null);

  const getMinSelectableDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow;
  };

  const [selectedDate, setSelectedDate] = useState(getMinSelectableDate());
  const [selectedTime, setSelectedTime] = useState("09:00");

  const handleDateChange = (e) => {
    const selectedDateTime = new Date(e.target.value);

    // Ensure the selected date is at least tomorrow at 9 AM
    const minDate = getMinSelectableDate();

    if (selectedDateTime >= minDate) {
      setSelectedDate(selectedDateTime);
    } else {
      // If an earlier date is selected, reset to minimum selectable date
      setSelectedDate(minDate);
      setSelectedTime("09:00");
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    const selectedDateTime = new Date(selectedDate);
    const minDate = getMinSelectableDate();

    // If selected date is the minimum date (tomorrow),
    // ensure time is not before 9 AM
    if (selectedDateTime.toDateString() === minDate.toDateString()) {
      const [hours, minutes] = newTime.split(":").map(Number);
      if (hours < 9) {
        setSelectedTime("09:00");
        return;
      }
    }

    setSelectedTime(newTime);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setAttachedImages((prevImages) => [...prevImages, ...imageUrls].slice(0, 3));
  };

  const handleImageDelete = (indexToDelete) => {
    setAttachedImages((prevImages) => prevImages.filter((_, index) => index !== indexToDelete));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCancelReason("");
  };

  const handlePetSelect = (selectedDog) => {
    if (!selectedDog) return;
    console.log("selectedDog", selectedDog);

    setPetInfo({
      id: selectedDog.dogId,
      name: selectedDog.dogName,
      image: selectedDog.dogProfileImage,
      breed: selectedDog.dogBreed,
      weight: selectedDog.dogWeight,
      age: selectedDog.dogAge,
      gender: selectedDog.dogGender,
      neutering: selectedDog.neutering,
      experience: selectedDog.experience,
      significant: selectedDog.significant
    });

    setIsModalOpen(false);
  };

  const openLocationModal = () => {
    SetIsLocationModalOpen(true);
  };

  const handleCloseLocationModal = () => {
    SetIsLocationModalOpen(false);
  };

  const handleLocationSelect = (selectLocation) => {
    setLocation({
      sido: selectLocation.sido,
      sigungu: selectLocation.sigungu,
      sidoName: selectLocation.sidoName,
      sigunguName: selectLocation.sigunguName
    });
    SetIsLocationModalOpen(false);
  };

  return (
    <div className="mx-auto mb-[var(--bottom-bar-height)] mt-[var(--header-height)] max-w-lg bg-white px-6">
      {/* 지역 */}
      <div className="mb-1.5 flex items-center space-x-2">
        <img src={Region} alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">지역</h2>
        {location && (
          <RiEditLine size={20} className="cursor-pointer py-0.5 text-gray-500" onClick={openLocationModal} />
        )}
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        {location ? (
          <p>
            {location.sidoName} {location.sigunguName}
          </p>
        ) : (
          <p onClick={openLocationModal}>클릭해서 견적 요청을 보낼 지역을 선택하세요!</p>
        )}
      </div>

      {/* 미용 일시 */}
      <div className="mb-1.5 flex items-center space-x-2">
        <img src={Schedule} alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">미용 일시</h2>
      </div>

      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-1">
            <input
              type="date"
              min={getMinSelectableDate().toISOString().split("T")[0]}
              value={selectedDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="w-full rounded-lg border border-main-400 px-4 py-2 text-center"
            />
          </div>
          <div className="flex flex-1">
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full rounded-lg border border-main-400 px-4 py-2 text-center"
            />
          </div>
        </div>
      </div>

      {/* 반려견 정보 */}
      <div className="mb-1.5 flex items-center space-x-2">
        {/* <BiSolidDog size={24} color="black" /> */}
        <img src={Corgi} alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">반려견 정보</h2>
        {petInfo && <RiEditLine size={20} className="cursor-pointer text-gray-500" onClick={openModal} />}{" "}
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        {petInfo ? (
          <div className="flex items-start">
            <div className="mr-4 self-center">
              <img src={petInfo?.image} alt="반려견 사진" className="h-28 w-28 rounded-lg object-cover" />
              <p className="mt-1 text-center font-semibold">{petInfo?.name}</p>
            </div>
            <div className="text-sm leading-normal">
              <p>견종: {petInfo?.breed}</p>
              <p>무게: {petInfo?.weight}</p>
              <p>나이: {petInfo?.age}</p>
              <p>성별: {petInfo?.gender == "MALE" ? "남아" : "여아"}</p>
              <p>중성화 여부: {petInfo?.neutering ? "Y" : "N"}</p>
              <p>미용 신청 여부: {petInfo?.experience ? "Y" : "N"}</p>
              <p>특이사항: {petInfo?.significant}</p>
            </div>
          </div>
        ) : (
          <p onClick={openModal}>클릭해서 미용할 반려견을 선택하세요!</p>
        )}
      </div>

      {/* 요청 내용 */}
      <div className="mb-1.5 flex items-center space-x-2">
        <img src={Note} alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">요청 내용</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
        <textarea
          placeholder="요청 내용을 상세하게 작성해주세요."
          className="w-full resize-none rounded-lg border-none focus:outline-none"
          rows={4}
        />
      </div>

      {/* 첨부 사진 */}
      <div className="mb-1.5 flex items-center space-x-2">
        <img src={Photos} alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold leading-none">첨부 사진</h2>
      </div>

      <div className="rounded-lg">
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
        <div className="grid grid-cols-3 gap-3">
          {/* Render existing images with delete button */}
          {attachedImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Uploaded ${index}`} className="h-28 w-28 rounded-lg object-cover" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleImageDelete(index);
                }}
                // className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-70 text-black"
                className="absolute right-1 top-1 h-5 w-5 items-center rounded-full text-[25px] text-white text-opacity-90"
              >
                {/* ✕ */}
                <IoIosCloseCircle />
              </button>
            </div>
          ))}

          {/* Fill remaining grid slots */}
          {[...Array(3 - attachedImages.length)].map((_, index) =>
            attachedImages.length < 3 && index === 0 ? (
              <label
                key="add-photo"
                htmlFor="imageUpload"
                className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-lg border bg-gray-100"
              >
                <IoIosAddCircle className="text-gray-300" size={28} />
              </label>
            ) : (
              <div key={`empty-${index}`} className="h-28 w-28 rounded-lg" />
            )
          )}
        </div>
      </div>

      {/* 모달 */}
      <PetSelectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handlePetSelect}
        closeText="닫기"
        confirmText="확인"
      >
        <div>
          <p className="mb-4 text-sm font-medium">취소 사유를 입력해주세요.</p>
          <input
            type="text"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="취소 사유 입력"
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>
      </PetSelectModal>

      {/* 모달 */}
      <RegionSelectModal
        isOpen={isLocationModalOpen}
        onClose={handleCloseLocationModal}
        onConfirm={handleLocationSelect}
        closeText="닫기"
        confirmText="확인"
      >
        <div>
          <p className="mb-4 text-sm font-medium">취소 사유를 입력해주세요.</p>
          <input
            type="text"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="취소 사유 입력"
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>
      </RegionSelectModal>
    </div>
  );
};

export default TotalQuoteRequestForm;
