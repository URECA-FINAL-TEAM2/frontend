import PropTypes from "prop-types";

const PetNeutering = ({ onlyRead, formData, setFormData }) => {
  return (
    <div>
      <label className="labelStyle">중성화</label>
      <div className="mx-auto grid w-3/4 grid-cols-2 gap-4 py-3 text-center">
        <button
          type="button"
          className={`rounded-lg border-2 py-1 ${
            formData.neutering === "O"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          }`}
          onClick={() => !onlyRead && setFormData({ ...formData, neutering: "O" })}
          disabled={onlyRead}
        >
          O
        </button>
        <button
          type="button"
          className={`rounded-lg border-2 py-1 ${
            formData.neutering === "X"
              ? onlyRead
                ? "btn-selected-readonly"
                : "btn-selected-editable"
              : onlyRead
                ? "btn-unselected-readonly"
                : "btn-unselected-editable"
          } `}
          onClick={() => !onlyRead && setFormData({ ...formData, neutering: "X" })}
          disabled={onlyRead}
        >
          X
        </button>
      </div>
    </div>
  );
};

PetNeutering.propTypes = {
  onlyRead: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    neutering: PropTypes.string
  }),
  setFormData: PropTypes.func.isRequired
};

export default PetNeutering;
