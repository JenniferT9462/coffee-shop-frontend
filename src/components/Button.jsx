import PropTypes from 'prop-types';
export default function Button({ label, handleClick }) {
  return (
    <button onClick={handleClick} className="btn btn-primary">
      {label}
    </button>
  );
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};