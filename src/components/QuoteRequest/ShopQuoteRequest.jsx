import React, { useState } from "react";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { ImScissors } from "react-icons/im";
import { BiSolidDog } from "react-icons/bi";
import { GrDocumentUser } from "react-icons/gr";
import { TbPhoto } from "react-icons/tb";
import PetSelectModal from "@/components/QuoteRequest/PetSelectModal";

const ShopQuoteRequest = (shopId) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [attachedImages, setAttachedImages] = useState([]);
  const [petInfo, setPetInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 10, 24));
  const [selectedTime, setSelectedTime] = useState("15:00");

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
      {/* 매장 및 디자이너 정보 */}
      <div className="mb-2 flex items-center space-x-2">
        <ImScissors size={24} color="black" />
        <h2 className="text-xl font-semibold">매장 · 디자이너 정보</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <div className="flex items-center">
          <img src="https://picsum.photos/200" alt="매장 로고" className="mr-4 h-20 w-20 rounded-lg" />
          <div>
            <p className="text-[15px] font-semibold">멍댕살롱</p>
            <p className="mb-0.5 text-[13px] text-gray-600">경기 안양시 만안구 만안로 96 1층 140호</p>
            <p className="text-[15px] font-semibold">가영 디자이너</p>
            <p className="text-[13px] text-gray-600">010-1234-5678</p>
          </div>
        </div>
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

      {/* <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-main-400 px-4 py-2 text-center text-sm">
            <p>2024년 11월 24일</p>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-main-400 px-4 py-2 text-center text-sm">
            <p>오후 3:00</p>
          </div>
        </div>
      </div> */}

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
    </div>
  );
};

export default ShopQuoteRequest;
