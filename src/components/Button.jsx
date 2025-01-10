import PropTypes from 'prop-types';
export default function Button({ label, handleClick, variant="primary" }) {
  return (
    <button 
      type="button" 
      onClick={handleClick} 
      className={`btn btn-${variant}`}>
      {label}
    </button>
  );
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};