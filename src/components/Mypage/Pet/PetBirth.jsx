import PropTypes from "prop-types";

const PetBirth = ({ onlyRead, formData, setFormData }) => {
  const handleBirthChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dogBirth: {
        ...formData.dogBirth,
        [name]: value
      }
    });
  };

  return (
    <div>
      <label className="labelStyle">생년월일*</label>
      <div className="mx-auto grid w-3/4 grid-cols-3 gap-3 pb-6 pt-2">
        {/* 반려견 정보 조회 */}
        {onlyRead ? (
          <>
            <div className="rounded-lg border border-main-400 px-2 py-1">{formData.dogBirth.year}</div>
            <div className="rounded-lg border border-main-400 px-2 py-1">{formData.dogBirth.month}</div>
            <div className="rounded-lg border border-main-400 px-2 py-1">{formData.dogBirth.day}</div>
          </>
        ) : (
          <>
            {/* 반려전 정보 수정 */}
            <select
              className="rounded-lg border border-main-200 px-2 py-1"
              name="year"
              value={formData.dogBirth.year}
              onChange={handleBirthChange}
            >
              <option value="">년</option>
              {Array.from({ length: 30 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>

            <select
              className="rounded-lg border border-main-200 px-2 py-1"
              name="month"
              value={formData.dogBirth.month}
              onChange={handleBirthChange}
            >
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="rounded-lg border border-main-200 px-2 py-1"
              name="day"
              value={formData.dogBirth.day}
              onChange={handleBirthChange}
            >
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};

PetBirth.propTypes = {
  onlyRead: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    dogBirth: PropTypes.shape({
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      day: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired
  }).isRequired,
  setFormData: PropTypes.func.isRequired
};

export default PetBirth;
