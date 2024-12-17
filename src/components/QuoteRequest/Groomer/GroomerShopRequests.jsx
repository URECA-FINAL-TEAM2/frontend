import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Schedule, Corgi, Note } from "/public/Icons";
import useAuthStore from "@/store/authStore";
import Modal from "@/components/common/modal/modal";
import { RequestReject } from "@/queries/quoteRequestQuery";

function GroomerShopRequests({ Infos, onRequestReject }) {
  if (Infos == null) return <></>;
  return (
    <>
      {Infos.map((Info) => {
        return <GroomerEstimate Info={Info} onRequestReject={onRequestReject} />;
      })}
    </>
  );
}

const GroomerEstimate = ({ Info, onRequestReject }) => {
  const { id } = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRejectReason("");
  };

  const handleReject = async () => {
    if (rejectReason.trim() === "") {
      alert("거절 사유를 입력해주세요.");
      return;
    }

    try {
      const rejectData = {
        requestId: Info.requestId,
        groomerId: id.groomerId,
        rejectReason: rejectReason
      };
      const response = await RequestReject(rejectData);
      console.log("거절 성공: " + response);
      onRequestReject(Info.requestId);
      setIsModalOpen(false);
      setRejectReason("");
    } catch (error) {
      console.log("견적 요청 거절 실패");
    }
  };

  return (
    <div className="m-5 rounded-xl bg-white p-4">
      <div className="mb-3 flex">
        <img src={Info.userProfileImage} alt="고객 프로필" className="mr-3 h-10 w-10 rounded-lg object-cover" />
        <div>
          <p className="line-clamp-1 px-0.5 font-semibold leading-[1.1]">{Info.userName} 고객님</p>
          <span className="rounded-md bg-main-100 px-1 py-[1px] text-xs text-main">
            {formatDate(Info.expiryDate)}까지
          </span>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <div className="mb-1 flex items-center">
          <img src={Schedule} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">{formatDate(Info.beautyDate)}</p>
        </div>
        <div className="mb-1 flex items-center">
          <img src={Corgi} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">
            {Info.dogBreed} • {Info.dogGender == "MALE" ? "남아" : "여아"} • {Info.dogWeight}kg
          </p>
        </div>
        <div className="flex items-center">
          <img src={Note} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">{Info.requestContent}</p>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div
          onClick={() => {
            navigate(`/groomer/quotes/request/detail/${Info.requestId}`);
          }}
          className="flex h-[32px] w-3/4 cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-center text-sm"
        >
          상세보기
        </div>
        <div
          onClick={openModal}
          className="flex h-[32px] w-1/4 cursor-pointer items-center justify-center rounded-lg bg-gray-300 text-center text-sm text-white"
        >
          거절하기
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleReject}>
        <div className="w-full">
          <p className="mb-4 text-center font-medium">거절 사유를 입력해주세요.</p>
          <input
            type="text"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="거절 사유 입력"
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>
      </Modal>
    </div>
  );
};

export default GroomerShopRequests;
