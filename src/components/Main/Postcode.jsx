import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import PropTypes from "prop-types";

const Postcode = ({ setFormData, handleChange }) => {
  const [roadAddress, setRoadAddress] = useState(); // 도로명주소
  const [detailAddress, setDetailAddress] = useState(); // 상세주소
  const [isOpen, setIsOpen] = useState();

  const completeHandler = (data) => {
    setRoadAddress(data.roadAddress);
    setIsOpen(false);
    setFormData((prev) => ({ ...prev, address: data.roadAddress }));
  };

  // Modal 스타일 
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.3)"
    },
    content: {
      margin: "auto",
      width: "330px",
      height: "500px",
      padding: "0",
      overflow: "hidden"
    }
  };

  // 주소 검색창 오픈
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 상세 주소 검색
  const changeHandler = (e) => {
    const detail = e.target.value;
    setDetailAddress(detail);

    // address : 도로명 주소 + 상세 주소 저장
    setFormData((prev) => ({ ...prev, address: `${roadAddress} ${detail}` }));
  };

  return (
    <>
      <div>
        <div className="labelStyle flex justify-between">
          <label htmlFor="address" className="">
            주소
          </label>

          <button className="rounded-lg bg-main px-3 text-xs text-white" onClick={toggle}>
            주소 찾기
          </button>
        </div>

        <div className="inputStyle flex flex-col justify-between">
          <input
            type="text"
            id="address"
            name="address"
            value={roadAddress}
            onChange={handleChange}
            placeholder="도로명 주소"
            readOnly
          />

          <input type="text" onChange={changeHandler} value={detailAddress} placeholder="상세주소" />
        </div>
      </div>

      <Modal onRequestClose={() => setIsOpen(false)} isOpen={isOpen} ariaHideApp={false} style={customStyles}>
        <DaumPostcode onComplete={completeHandler} height="100%" />
      </Modal>
    </>
  );
};

Postcode.propTypes = {
  setFormData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Postcode;
