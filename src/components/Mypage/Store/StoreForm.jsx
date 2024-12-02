import Postcode from "@/components/Main/Postcode";
import ProfileImage from "../ProfileImage";

const StoreForm = ({ formData, setFormData, handleChange, handleSubmit, isUpdate, handleOpenModal }) => {
  return (
    <div className="mt-[75px]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileImage setFormData={setFormData} />

        {/* Store Name */}
        <div>
          <label htmlFor="storeName" className="labelStyle">
            매장 이름
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            placeholder="매장 이름을 입력해주세요."
            className="inputStyle"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="labelStyle">
            매장 설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="매장 설명을 입력해주세요."
            className="inputStyle"
            rows="4"
            required
          />
        </div>

        {/* Address */}
        <Postcode />

        {/* Business Time */}
        <div>
          <label htmlFor="businessTime" className="labelStyle">
            영업 시간
          </label>
          <input
            type="text"
            id="businessTime"
            name="businessTime"
            value={formData.businessTime}
            onChange={handleChange}
            placeholder="예: 09:00 - 18:00 매주 일요일 휴무"
            className="inputStyle"
            required
          />
        </div>

        {isUpdate ? (
          <button onClick={handleOpenModal} type="submit" className="bottomButtonPink">
            수정하기
          </button>
        ) : (
          <button onClick={handleOpenModal} type="submit" className="bottomButtonPink">
            등록하기
          </button>
        )}
      </form>
    </div>
  );
};

export default StoreForm;
