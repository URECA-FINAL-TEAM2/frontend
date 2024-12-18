import Postcode from "@/components/Main/Postcode";
import ProfileImage from "../ProfileImage";

const StoreForm = ({ formData, setFormData, handleChange, handleSubmit, isUpdate, handleOpenModal }) => {
  return (
    <div className="mt-[75px]">
      <form action="" className="space-y-6">
        <ProfileImage formData={formData} setFormData={setFormData} />

        {/* Store Name */}
        <div>
          <label htmlFor="shopName" className="labelStyle">
            매장 이름*
          </label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="매장 이름을 입력해주세요."
            className="inputStyle"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="labelStyle">
            매장 설명*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="매장 설명을 입력해주세요."
            className="inputStyle"
            rows="3"
            required
          />
        </div>

        {/* Address */}
        <Postcode formData={formData} setFormData={setFormData} handleChange={handleChange} />

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
          <button onClick={handleOpenModal} type="button" className="bottomButtonPink">
            수정완료
          </button>
        ) : (
          <button onClick={handleOpenModal} type="button" className="bottomButtonPink">
            등록하기
          </button>
        )}
      </form>
    </div>
  );
};

export default StoreForm;
