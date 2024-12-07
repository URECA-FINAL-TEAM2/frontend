import React, { useState } from "react";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiSolidDog } from "react-icons/bi";
import { GrDocumentUser } from "react-icons/gr";
import { TbPhoto } from "react-icons/tb";
import { GrMap } from "react-icons/gr";

import RegionSelectModal from "../common/modal/RegionSelectModal";
import PetSelectModal from "./PetSelectModal";

const TotalQuoteRequestForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [attachedImages, setAttachedImages] = useState([]);
  const [petInfo, setPetInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 10, 24));
  const [selectedTime, setSelectedTime] = useState("15:00");

  const [isLocationModalOpen, SetIsLocationModalOpen] = useState(false);
  const [location, setLocation] = useState(null);

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setAttachedImages((prevImages) => [...prevImages, ...imageUrls].slice(0, 3));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCancelReason("");
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

  const handlePetSelect = (selectedDog) => {
    console.log("selectedDog", selectedDog);
    // Transform the selected dog data to match your petInfo structure
    setPetInfo({
      name: selectedDog.name,
      image: selectedDog.image,
      breed: selectedDog.breed,
      weight: selectedDog.weight,
      age: selectedDog.age,
      dogGender: selectedDog.dogGender,
      neutering: selectedDog.neutering,
      experience: selectedDog.experience,
      significant: selectedDog.significant
    });
    // Close the modal after selection
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto mb-[var(--bottom-bar-height)] mt-[var(--header-height)] max-w-lg bg-white px-6">
      {/* 지역 */}
      <div className="mb-2 flex items-center space-x-2">
        <GrMap size={24} color="black" />
        <h2 className="text-xl font-semibold">지역</h2>
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

      <div className="mb-2 flex items-center space-x-2">
        <RiCalendarScheduleLine size={24} color="black" />
        <h2 className="text-xl font-semibold">미용 일시</h2>
      </div>

      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-1">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="w-full rounded-lg border border-main-400 px-4 py-2 text-center text-sm"
            />
          </div>
          <div className="flex flex-1">
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full rounded-lg border border-main-400 px-4 py-2 text-center text-sm"
            />
          </div>
        </div>
      </div>

      {/* 반려견 정보 */}
      <div className="mb-2 flex items-center space-x-2">
        <BiSolidDog size={24} color="black" />
        <h2 className="text-xl font-semibold">반려견 정보</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        {petInfo ? (
          <div className="flex items-start">
            <div className="mr-4 flex flex-col self-center">
              <img src={petInfo?.image} alt="반려견 사진" className="h-28 w-28 rounded-lg" />
              <p className="mt-1 text-center font-medium">{petInfo?.name}</p>
            </div>
            <div className="leading-snug">
              <p>견종: {petInfo?.breed}</p>
              <p>무게: {petInfo?.weight}</p>
              <p>나이: {petInfo?.age}</p>
              <p>성별: {petInfo?.dogGender == "MALE" ? "남아" : "여아"}</p>
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
      <div className="mb-2 flex items-center space-x-2">
        <GrDocumentUser size={24} color="black" />
        <h2 className="text-xl font-semibold">요청 내용</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
        <textarea
          placeholder="요청 내용을 상세하게 작성해주세요."
          className="w-full resize-none rounded-lg border-none p-2 focus:outline-none"
          rows={4}
        />
      </div>

      {/* 첨부 사진 */}
      <div className="mb-2 flex items-center space-x-2">
        <TbPhoto size={24} color="black" />
        <h2 className="text-xl font-semibold">첨부 사진</h2>
      </div>

      <div className="rounded-lgp-4">
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
        <label htmlFor="imageUpload" className="cursor-pointer">
          <div className="grid grid-cols-3 gap-2">
            {attachedImages.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded ${index}`} className="h-24 w-24 rounded-lg object-cover" />
            ))}
            {attachedImages.length < 3 && (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-gray-100">
                + 사진 추가
              </div>
            )}
          </div>
        </label>
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
