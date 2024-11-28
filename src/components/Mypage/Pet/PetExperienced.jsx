import PropTypes from "prop-types";

const PetExperienced = ({ onlyRead, formData, setFormData }) => {
  return (
    <div>
      <label className="labelStyle">미용경험</label>
      <div className="mx-auto grid w-3/4 grid-cols-2 gap-4 py-3 text-center">
        <button
          type="button"
          className={`rounded-lg border-2 py-1 ${
            formData.experienced === "O"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, experienced: "O" })}
          disabled={onlyRead}
        >
          O
        </button>
        <button
          type="button"
          className={`rounded-lg border-2 py-1 ${
            formData.experienced === "X"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, experienced: "X" })}
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
    experienced: PropTypes.string
  }),
  setFormData: PropTypes.func.isRequired
};

export default PetExperienced;
