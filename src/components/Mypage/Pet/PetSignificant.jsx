const PetSignificant = ({ onlyRead, formData, handleChange }) => {
  return (
    <div className="mb-28">
      <label className="labelStyle" htmlFor="significant">
        특이사항
      </label>
      {onlyRead ? (
        <div className="inputStyle h-[33px]">{formData.significant}</div>
      ) : (
        <textarea
          className="inputStyle border-b-main-200"
          id="significant"
          name="significant"
          value={formData.significant}
          onChange={handleChange}
          placeholder="특이사항을 입력해주세요"
        />
      )}
    </div>
  );
};

export default PetSignificant;
