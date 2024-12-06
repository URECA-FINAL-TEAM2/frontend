import { getDogInfo } from "@/queries/quoteRequestQuery";
import React, { useEffect, useState } from "react";
import { BiSolidDog, BiWon } from "react-icons/bi";
import { GrDocumentText, GrDocumentUser } from "react-icons/gr";
import { ImScissors } from "react-icons/im";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbPhoto, TbCash } from "react-icons/tb";

function GroomerQuote(quotesId) {
  const [dogInfo, setDogInfo] = useState(null);

  useEffect(() => {
    const fetchDogInfo = async () => {
      try {
        const data = await getDogInfo();
        setDogInfo(data);
      } catch (error) {
        console.error("Error fetching dog Info:", error);
        setDogInfo([]);
      }
    };

    fetchDogInfo();
  }, []);

  return (
    <div className="mx-auto max-w-lg bg-white p-6">
      {/* 미용 일시 */}

      <div className="mb-2 flex items-center space-x-2">
        <RiCalendarScheduleLine size={24} color="black" />
        <h2 className="text-xl font-semibold">미용 일시</h2>
      </div>

      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-1 items-center justify-center rounded-lg border border-main-400 px-4 py-2 text-center text-sm">
            <p>2024년 11월 24일</p>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-main-400 px-4 py-2 text-center text-sm">
            <p>오후 3:00</p>
          </div>
        </div>
      </div>

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

      {/* 반려견 정보 */}
      <div className="mb-2 flex items-center space-x-2">
        <BiSolidDog size={24} color="black" />
        <h2 className="text-xl font-semibold">반려견 정보</h2>
      </div>

      <div className="mb-6 flex items-start rounded-lg border border-main-400 p-4">
        <div className="mr-4 flex flex-col self-center">
          <img src={dogInfo?.image} alt="반려견 사진" className="h-28 w-28 rounded-lg" />
          <p className="mt-1 text-center font-medium">{dogInfo?.name}</p>
        </div>
        <div className="leading-snug">
          <p>견종: {dogInfo?.breed}</p>
          <p>무게: {dogInfo?.weight}</p>
          <p>나이: {dogInfo?.age}</p>
          <p>성별: {dogInfo?.dogGender == "MALE" ? "남아" : "여아"}</p>
          <p>중성화 여부: {dogInfo?.neutering ? "Y" : "N"}</p>
          <p>미용 신청 여부: {dogInfo?.experience ? "Y" : "N"}</p>
          <p>특이사항: {dogInfo?.significant}</p>
        </div>
      </div>

      {/* 요청 내용 */}
      <div className="mb-2 flex items-center space-x-2">
        <GrDocumentUser size={24} color="black" />
        <h2 className="text-xl font-semibold">요청 내용</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <p className="leading-snug">목욕 + 식빵컷 원합니다. 첨부한 사진들처럼 빵실하게요.</p>
      </div>

      {/* 첨부 사진 */}
      <div className="mb-2 flex items-center space-x-2">
        <TbPhoto size={24} color="black" />
        <h2 className="text-xl font-semibold">첨부 사진</h2>
      </div>

      <div className="rounded-lgp-4 mb-6">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-24 w-24 rounded-lg border bg-gray-100"></div>
          <div className="h-24 w-24 rounded-lg border bg-gray-100"></div>
          <div className="h-24 w-24 rounded-lg border bg-gray-100"></div>
        </div>
      </div>

      {/* 견적 설명 */}
      <div className="mb-2 flex items-center space-x-2">
        <GrDocumentText size={24} color="black" />
        <h2 className="text-xl font-semibold">견적 설명</h2>
      </div>

      <div className="mb-6 rounded-lg border border-main-400 p-4">
        <p className="leading-snug">
          2.1kg 반려견 기준으로 기본요금 40,000원 책정되었습니다. 예상 소요 시간은 1시간 30분입니다.
        </p>
      </div>

      {/* 금액 */}
      <div className="mb-2 flex justify-between">
        <div className="flex items-center space-x-2">
          <BiWon size={24} color="black" />
          <h2 className="text-xl font-semibold leading-none">금액</h2>
        </div>
        <p className="text-xl font-semibold leading-none">60,000원</p>
      </div>

      {/* 예약금 */}
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <TbCash size={24} color="black" />
          <h2 className="text-xl font-semibold leading-none">예약금 (10%)</h2>
        </div>
        <p className="bg-main-200 text-xl font-semibold leading-none">12,000원</p>
      </div>
    </div>
  );
}

export default GroomerQuote;
