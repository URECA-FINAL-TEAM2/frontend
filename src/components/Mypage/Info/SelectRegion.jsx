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
      if (!formData.sidoName) {
        setSigunguList([]);
        return;
      }

      try {
        const response = await getSigunguList(formData.sidoName); // id로 보내야됨
        setSigunguList(response);
      } catch (error) {
        console.error("시군구 목록 로드 실패:", error);
      }
    };

    fetchSigunguList();
  }, [formData.sidoName]);

  const handleSidoChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sidoName: Number(e.target.value),
      sigunguName: ""
    }));
  };

  return (
    <div className="mx-auto mt-2 flex w-3/4 gap-4">
      <select
        value={formData.sidoName}
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
        value={formData.sigunguName}
        onChange={(e) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            sigunguName: Number(e.target.value)
          }))
        }
        disabled={!formData.sidoName}
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
