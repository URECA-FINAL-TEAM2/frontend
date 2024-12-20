import PropTypes from "prop-types";
import "../../../css/styles.css";

const PetGender = ({ onlyRead, formData, setFormData }) => {
  return (
    <div>
      <label className="labelStyle">성별*</label>
      <div className="mx-auto grid w-3/4 grid-cols-2 gap-4 pb-6 pt-2 text-center">
        <button
          type="button"
          className={`rounded-lg border py-1 ${
            formData.dogGender === "MALE"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, dogGender: "MALE" })}
          disabled={onlyRead}
        >
          남아
        </button>
        <button
          type="button"
          className={`rounded-lg border py-1 ${
            formData.dogGender === "FEMALE"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, dogGender: "FEMALE" })}
          disabled={onlyRead}
        >
          여아
        </button>
      </div>
    </div>
  );
};

PetGender.propTypes = {
  onlyRead: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    dogGender: PropTypes.string
  }).isRequired,
  setFormData: PropTypes.func.isRequired
};

export default PetGender;
