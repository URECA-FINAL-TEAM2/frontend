import React, { useEffect, useState } from "react";
import { getSidoList, getSigunguList } from "../../../queries/regionQuery";

const SelectRegion = ({ formData, setFormData }) => {
  const [sidoList, setSidoList] = useState([]);
  const [sigunguList, setSigunguList] = useState([]);

  // 시도 목록 로드
  useEffect(() => {
    const fetchSidoList = async () => {
      try {
        const response = await getSidoList();
        setSidoList(response.data.sidoList);
      } catch (error) {
        console.error("시도 목록 로드 실패:", error);
      }
    };

    fetchSidoList();
  }, []);

  // 시군구 목록 로드
  useEffect(() => {
    const fetchSigunguList = async () => {
      if (!formData.sido) {
        setSigunguList([]);
        return;
      }

      try {
        const response = await getSigunguList(formData.sido);
        setSigunguList(response.data.sigunguList);
      } catch (error) {
        console.error("시군구 목록 로드 실패:", error);
      }
    };

    fetchSigunguList();
  }, [formData.sido]);

  const handleSidoChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sido: Number(e.target.value),
      sigungu: ""
    }));
  };

  return (
    <div className="mx-auto mt-2 flex w-3/4 gap-4">
      <select
        value={formData.sido}
        onChange={handleSidoChange}
        className="h-[30px] w-[152px] rounded-md border border-main-300 px-2"
      >
        <option value="">시/도 선택</option>
        {sidoList.map((sido) => (
          <option key={sido.sidoId} value={sido.sidoId}>
            {sido.sidoName}
          </option>
        ))}
      </select>

      <select
        value={formData.sigungu}
        onChange={(e) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            sigungu: Number(e.target.value)
          }))
        }
        disabled={!formData.sido}
        className="h-[30px] w-[152px] rounded-md border border-main-300 px-2 disabled:bg-gray-100"
      >
        <option value="">시/군/구 선택</option>
        {sigunguList.map((sigungu) => (
          <option key={sigungu.sigunguId} value={sigungu.sigunguId}>
            {sigungu.sigunguName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectRegion;
