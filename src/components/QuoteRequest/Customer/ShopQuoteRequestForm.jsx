import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";

import PetSelectModal from "@/components/QuoteRequest/PetSelectModal";

const ShopQuoteRequestForm = (shopId) => {
  // TODO : API 연결
  const groomerInfo = {
    shopImage: "https://picsum.photos/200",
    groomerName: "문정", //nickname
    shopName: "강남구미용실1",
    address: "서울 강남구 101-1",
    phone: "010-1234-5678"
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [attachedImages, setAttachedImages] = useState([]);
  const [petInfo, setPetInfo] = useState(null);

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
    console.log("selectedDog", selectedDog);

    setPetInfo({
      name: selectedDog.dogName,
      image: selectedDog.image,
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

  return (
    <div className="mx-auto mb-[var(--bottom-bar-height)] mt-[var(--header-height)] max-w-lg bg-white px-6">
      {/* 매장 및 디자이너 정보 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Designer.svg" alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">매장 · 디자이너 정보</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-3">
        <div className="flex items-center">
          <img src={groomerInfo.shopImage} alt="매장 로고" className="mr-3 h-20 w-20 rounded-lg" />
          <div>
            <p className="text-[15px] font-semibold leading-[18px]">{groomerInfo.shopName}</p>
            <p className="mb-1.5 line-clamp-1 text-sm leading-[18px] text-gray-600">{groomerInfo.address}</p>
            <p className="text-[15px] font-semibold leading-[18px]">{groomerInfo.groomerName} 디자이너</p>
            <p className="text-sm leading-[18px] text-gray-600">{groomerInfo.phone}</p>
          </div>
        </div>
      </div>

      {/* 미용 일시 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Schedule.svg" alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">미용 일시</h2>
      </div>

      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-1">
            <input
              type="date"
              min={getMinSelectableDate().toISOString().split("T")[0]}
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
      <div className="mb-2 flex items-center space-x-1">
        {/* <BiSolidDog size={24} color="black" /> */}
        <img src="/public/Icons/Corgi.svg" alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">반려견 정보</h2>
        {petInfo && <RiEditLine size={20} className="cursor-pointer text-gray-500" onClick={openModal} />}{" "}
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        {petInfo ? (
          <div className="flex items-start">
            <div className="mr-4 self-center">
              <img src={petInfo?.image} alt="반려견 사진" className="h-28 w-28 rounded-lg" />
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
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Note.svg" alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">요청 내용</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4 leading-tight">
        <textarea
          placeholder="요청 내용을 상세하게 작성해주세요."
          className="w-full resize-none rounded-lg border-none focus:outline-none"
          rows={4}
        />
      </div>

      {/* 첨부 사진 */}
      <div className="mb-2 flex items-center space-x-1">
        <img src="/public/Icons/Photos.svg" alt="Description" className="h-5 w-5" />
        <h2 className="text-lg font-semibold">첨부 사진</h2>
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

      {/* 반려견 선택 모달 */}
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

export default ShopQuoteRequestForm;
