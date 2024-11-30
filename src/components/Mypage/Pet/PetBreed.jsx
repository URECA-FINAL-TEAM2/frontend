const PetBreed = ({ onlyRead, formData, handleChange }) => {
  return (
    <div>
      <label className="labelStyle" htmlFor="breed">
        품종
      </label>
      {onlyRead ? (
        <div className="inputStyle h-[33px]">{formData.breed}</div>
      ) : (
        <input
          className="inputStyle border-b-main-200"
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />
      )}
    </div>
  );
};

export default PetBreed;
