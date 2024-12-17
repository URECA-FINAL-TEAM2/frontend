const PetName = ({ onlyRead, formData, handleChange }) => {
  return (
    <div>
      <label className="labelStyle" htmlFor="dogName">
        반려견 이름*
      </label>
      {onlyRead ? (
        <div className="inputStyle h-[33px]">{formData.dogName}</div>
      ) : (
        <input
          className="inputStyle border-b-main-200"
          type="text"
          id="dogName"
          name="dogName"
          placeholder="반려견 이름을 입력해주세요"
          value={formData.dogName}
          onChange={handleChange}
          required
        />
      )}
    </div>
  );
};

export default PetName;
