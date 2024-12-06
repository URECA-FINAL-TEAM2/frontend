import PropTypes from "prop-types";

const PetExperienced = ({ onlyRead, formData, setFormData }) => {
  return (
    <div>
      <label className="labelStyle">미용경험</label>
      <div className="mx-auto grid w-3/4 grid-cols-2 gap-4 pb-6 pt-2 text-center">
        <button
          type="button"
          className={`rounded-lg border py-1 ${
            formData.experience === "O"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, experience: "O" })}
          disabled={onlyRead}
        >
          O
        </button>
        <button
          type="button"
          className={`rounded-lg border py-1 ${
            formData.experience === "X"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, experience: "X" })}
          disabled={onlyRead}
        >
          X
        </button>
      </div>
    </div>
  );
};

PetExperienced.propTypes = {
  onlyRead: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    experience: PropTypes.string
  }),
  setFormData: PropTypes.func.isRequired
};

export default PetExperienced;
