import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "./modal";
import { getSidoList, getSigunguList } from "../../../queries/regionQuery";

const RegionSelectModal = ({ isOpen, onClose, onConfirm, sidoName, sigunguName }) => {
  const [sidoList, setSidoList] = useState([]);
  const [sigunguList, setSigunguList] = useState([]);
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedSigungu, setSelectedSigungu] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 시도 목록 로드
  useEffect(() => {
    const fetchSidoList = async () => {
      try {
        const response = await getSidoList();
        setSidoList(response);

        // Set default 시/도 when props are provided
        const defaultSido = response.find((sido) => sido.sidoName === sidoName);
        if (defaultSido) setSelectedSido(defaultSido.sidoId);
      } catch (error) {
        console.error("시도 목록 로드 실패:", error);
      }
    };

    fetchSidoList();
  }, [sidoName]);

  // 시군구 목록 로드
  useEffect(() => {
    const fetchSigunguList = async () => {
      if (!selectedSido) {
        setSigunguList([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getSigunguList(selectedSido);
        setSigunguList(response);

        // Set default 시/군/구 when props are provided
        const defaultSigungu = response.find((sigungu) => sigungu.sigunguName === sigunguName);
        if (defaultSigungu) setSelectedSigungu(defaultSigungu.sigunguId);
      } catch (error) {
        console.error("시군구 목록 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSigunguList();
  }, [selectedSido, sigunguName]);

  const handleSidoChange = (e) => {
    const sidoId = Number(e.target.value);
    setSelectedSido(sidoId);
    setSelectedSigungu("");
  };

  const handleConfirm = () => {
    if (!selectedSido || !selectedSigungu) {
      alert("시/도와 시/군/구를 모두 선택해주세요.");
      return;
    }

    const selectedSidoName = sidoList.find((sido) => sido.sidoId === selectedSido)?.sidoName;
    const selectedSigunguName = sigunguList.find((sigungu) => sigungu.sigunguId === selectedSigungu)?.sigunguName;

    onConfirm({
      sido: selectedSido,
      sigungu: selectedSigungu,
      sidoName: selectedSidoName,
      sigunguName: selectedSigunguName
    });
  };

  const handleClose = () => {
    setSelectedSido("");
    setSelectedSigungu("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} onConfirm={handleConfirm}>
      <p className="mb-5 font-semibold">지역 선택하기</p>
      <div className="flex gap-4">
        <select
          value={selectedSido}
          onChange={handleSidoChange}
          className="h-[32px] w-[152px] rounded-md border border-gray-300 px-2"
        >
          <option value="">시/도 선택</option>
          {sidoList.map((sido) => (
            <option key={sido.sidoId} value={sido.sidoId}>
              {sido.sidoName}
            </option>
          ))}
        </select>

        <select
          value={selectedSigungu}
          onChange={(e) => setSelectedSigungu(Number(e.target.value))}
          disabled={!selectedSido || isLoading}
          className="h-[32px] w-[152px] rounded-md border border-gray-300 px-2 disabled:bg-gray-100"
        >
          <option value="">시/군/구 선택</option>
          {sigunguList.map((sigungu) => (
            <option key={sigungu.sigunguId} value={sigungu.sigunguId}>
              {sigungu.sigunguName}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
};

RegionSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  sidoName: PropTypes.string, // Default 시/도 이름
  sigunguName: PropTypes.string // Default 시/군/구 이름
};

export default RegionSelectModal;
