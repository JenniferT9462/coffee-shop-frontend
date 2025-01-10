import PropTypes from "prop-types";
export default function Button({ label, handleClick, variant = "primary", fullWidth = false }) {
  const variantClass =
    {
      primary: "btn-primary",
      secondary: "btn-secondary",
      error: "btn-error",
      warning: "btn-warning",
      info: "btn-info",
    }[variant] || "btn-primary"; // Fallback to "btn-primary" if no match

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn ${variantClass} ${fullWidth ? "w-full" : ""}`}
    >
      {label}
    </button>
  );
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
};
