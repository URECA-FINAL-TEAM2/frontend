const PetBreed = ({ breed, onlyRead, formData, handleChange }) => {
  // 선택된 품종 이름 가져오기
  const selectedBreedName = breed.find((b) => b.breedId.toString() === formData.dogBreedCodeId)?.breedName;

  return (
    <div>
      <label className="labelStyle" htmlFor="dogBreedCodeId">
        품종
      </label>
      {onlyRead ? (
        // 읽기 전용 모드에서는 선택된 품종 이름 표시
        <div className="inputStyle h-[33px]">{selectedBreedName || ""}</div>
      ) : (
        // 선택 가능 모드에서는 드롭다운 표시
        <select
          className="inputStyle border-b-main-200"
          id="dogBreedCodeId"
          name="dogBreedCodeId"
          value={formData.dogBreedCodeId}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected className="text-gray-400">
            품종을 선택하세요
          </option>
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
