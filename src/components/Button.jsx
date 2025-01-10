import PropTypes from "prop-types";
export default function Button({ label, handleClick, variant = "primary" }) {
  const variantClass =
    {
      primary: "btn-primary",
      secondary: "btn-secondary",
      error: "btn-error",
    }[variant] || "btn-primary"; // Fallback to "btn-primary" if no match

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn ${variantClass}`}
    >
      {label}
    </button>
  );
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
