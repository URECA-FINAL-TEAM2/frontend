const PetBreed = ({ breed, onlyRead, formData, handleChange }) => {
  return (
    <div>
      <label className="labelStyle" htmlFor="dogBreedCodeId">
        품종
      </label>
      {onlyRead ? (
        <div className="inputStyle h-[33px]">{formData.breed}</div>
      ) : (
        <select
          className="inputStyle border-b-main-200"
          id="dogBreedCodeId"
          name="dogBreedCodeId"
          value={formData.dogBreedCodeId}
          onChange={handleChange}
          required
        >
          <option value="">품종 선택</option>
          {breed.map((breed) => (
            <option key={breed.breedId} value={breed.breedId}>
              {breed.breedName}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PetBreed;
