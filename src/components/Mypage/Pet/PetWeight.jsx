const PetWeight = ({ onlyRead, formData, handleChange }) => {
  return (
    <div>
      <label className="labelStyle" htmlFor="dogWeight">
        몸무게(kg)
      </label>
      {onlyRead ? (
        <div className="inputStyle h-[33px]">{formData.dogWeight}</div>
      ) : (
        <input
          className="inputStyle border-b-main-200"
          type="text"
          id="dogWeight"
          name="dogWeight"
          value={formData.dogWeight}
          onChange={handleChange}
          placeholder="몸무게를 입력해주세요"
          required
        />
      )}
    </div>
  );
};

export default PetWeight;
