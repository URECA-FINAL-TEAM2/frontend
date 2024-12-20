import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../common/button/Button";
import { getQuotePetInfo } from "@/queries/petQuery";
import { useNavigate } from "react-router-dom";
import { getQuotePetList } from "@/queries/quoteRequestQuery";
import useAuthStore from "@/store/authStore";

const PetSelectModal = ({ isOpen = false, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const { id } = useAuthStore();
  const navigate = useNavigate();
  const [dogList, setDogList] = useState(null);

  const handleRegister = () => {
    navigate("/customer/mypet"); // TODO: 반려견 등록 완료 후 다시 견적요청 작성 페이지(PetSelectModal 사용한 페이지)로 이동
  };

  useEffect(() => {
    const fetchDogList = async () => {
      try {
        const data = await getQuotePetList(id.customerId);
        setDogList(data);
      } catch (error) {
        console.error("Error fetching dog list:", error);
        setDogList([]);
      }
    };

    fetchDogList();
  }, []);

  console.log(typeof dogList);
  console.log(dogList);

  if (!dogList) {
    return (
      <div className="fixed inset-0 z-50 mx-auto flex w-[400px] items-center justify-center bg-black bg-opacity-30">
        <div className="h-[170px] w-[360px] rounded-lg bg-white p-5 shadow-md">
          <div className="flex items-start justify-between">
            <IoCloseCircleOutline className="text-[20px] text-transparent" />
            <div className="font-semibold">반려견 선택하기</div>
            <IoCloseCircleOutline className="mt-[2px] cursor-pointer text-[20px] text-gray-500" />
          </div>
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (dogList.length === 0) {
    return (
      <div className="fixed inset-0 z-50 mx-auto flex w-[400px] items-center justify-center bg-black bg-opacity-30">
        <div className="h-[170px] w-[360px] rounded-lg bg-white p-5 shadow-md">
          <div className="flex items-start justify-between">
            <IoCloseCircleOutline className="text-[20px] text-transparent" />
            <div className="font-semibold">반려견 선택하기</div>
            <IoCloseCircleOutline className="mt-[2px] cursor-pointer text-[20px] text-gray-500" onClick={onClose} />
          </div>
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div className="text-center">등록된 반려견 정보가 없습니다.</div>
            <Button onClick={handleRegister} styleType="pink">
              반려견 등록하러 가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-[400px] items-center justify-center bg-black bg-opacity-30">
      <div className="h-[170px] w-[360px] rounded-lg bg-white py-5 shadow-md">
        <div className="flex items-start justify-between px-5">
          <IoCloseCircleOutline className="text-[20px] text-transparent" />
          <div className="font-semibold">반려견 선택하기</div>
          <IoCloseCircleOutline className="mt-[2px] cursor-pointer text-[20px] text-gray-500" onClick={onClose} />
        </div>
        <div className="flex h-full items-center justify-center">
          {dogList.slice(0, 5).map((dog) => (
            <div
              key={dog.dogId}
              className="mx-1 cursor-pointer items-center"
              onClick={() => {
                const fetchDogInfo = async () => {
                  try {
                    const data = await getQuotePetInfo(id.customerId, dog.dogId);
                    onConfirm(data);
                  } catch (error) {
                    console.error("Error fetching dog info:", error);
                  }
                };

                fetchDogInfo();
              }}
            >
              <img src={dog.profileImage} alt={dog.dogName} className="h-14 w-14 rounded-sm object-cover" />
              <div className="text-center">{dog.dogName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetSelectModal;
