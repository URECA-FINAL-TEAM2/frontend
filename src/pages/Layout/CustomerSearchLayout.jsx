import React, { useEffect, useState } from "react";
import InteractiveMap from "../../components/Map/InteractiveMap";
import { Outlet } from "react-router-dom";
import useRegionStore from "@/store/regionStore";
import { getUserAddress } from "@/queries/userQuery";

const CustomerSearchLayout = () => {
  const customerId = 47; // TODO
  const { sidoName, sigunguName, setRegion } = useRegionStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect 실행");
    const fetchUserAddress = async () => {
      try {
        console.log("getUserAddress 호출");
        const response = await getUserAddress(customerId);
        console.log("주소 로드 성공:", response.sidoName, response.sigunguName);
        setRegion(response.sidoName, response.sigunguName);
        console.log("setRegion 호출 완료");
      } catch (error) {
        console.error("주소 로드 실패:", error);
      } finally {
        setIsLoading(false);
        console.log("로딩 상태 변경 완료");
      }
    };

    fetchUserAddress();
  }, []);

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!sidoName || !sigunguName) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <p>데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative h-[100vh] w-full">
      <div className="absolute inset-0 top-[var(--header-height)] z-10">
        <InteractiveMap />
      </div>
      <div className="w-full overflow-clip">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerSearchLayout;
