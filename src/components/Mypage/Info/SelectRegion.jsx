import { useEffect, useState } from "react";
import { getSidoList, getSigunguList } from "../../../queries/regionQuery";

const SelectRegion = ({ formData, setFormData }) => {
  const [sidoList, setSidoList] = useState([]);
  const [sigunguList, setSigunguList] = useState([]);

  // 시도 목록 로드
  useEffect(() => {
    const fetchSidoList = async () => {
      try {
        const response = await getSidoList();
        setSidoList(response);
      } catch (error) {
        console.error("시도 목록 로드 실패:", error);
      }
    };

    fetchSidoList();
  }, []);

  // 시군구 목록 로드
  useEffect(() => {
    const fetchSigunguList = async () => {
      if (!formData.sidoId) {
        setSigunguList([]);
        return;
      }

      try {
        const response = await getSigunguList(formData.sidoId);
        setSigunguList(response);
      } catch (error) {
        console.error("시군구 목록 로드 실패:", error);
      }
    };

    fetchSigunguList();
  }, [formData.sidoId]);

  const handleSidoChange = (e) => {
    const sidoName = sidoList.find((sido) => sido.sidoId === Number(e.target.value));
    setFormData((prevFormData) => ({
      ...prevFormData,
      sidoId: Number(e.target.value),
      sidoName: sidoName,
      sigunguId: ""
    }));
  };

  const handleSigunguChange = (e) => {
    const sigunguName = sigunguList.find((sido) => sido.sigunguId === Number(e.target.value));
    setFormData((prevFormData) => ({
      ...prevFormData,
      sigunguId: Number(e.target.value),
      sigunguName: sigunguName
    }));
  };

  return (
    <div className="mx-auto mb-6 mt-2 flex w-3/4 gap-4">
      <select
        value={formData.sidoId || ""}
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
        value={formData.sigunguId || ""}
        onChange={handleSigunguChange}
        disabled={!formData.sidoId}
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
