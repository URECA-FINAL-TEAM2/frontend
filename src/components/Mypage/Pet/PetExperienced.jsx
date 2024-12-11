import PropTypes from "prop-types";

const PetExperienced = ({ onlyRead, formData, setFormData }) => {
  return (
    <div>
      <label className="labelStyle">미용경험</label>
      <div className="mx-auto grid w-3/4 grid-cols-2 gap-4 pb-6 pt-2 text-center">
        <button
          type="button"
          className={`rounded-lg border py-1 ${
            formData.experience === true
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, experience: true })}
          disabled={onlyRead}
        >
          O
        </button>
        <button
          type="button"
          className={`rounded-lg border py-1 ${
            formData.experience === false
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, experience: false })}
          disabled={onlyRead}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PetExperienced;
