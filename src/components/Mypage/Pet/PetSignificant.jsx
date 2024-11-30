const PetSignificant = ({ onlyRead, formData, handleChange }) => {
  return (
    <div>
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
        />
      )}
    </div>
  );
};

export default PetSignificant;
