import PropTypes from 'prop-types';
export default function Button({ label, handleClick }) {
  return (
    <button 
      type="button" 
      onClick={handleClick} 
      className="btn btn-primary w-full">
      {label}
    </button>
  );
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};