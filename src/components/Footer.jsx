// components/Navbar.js
import PropTypes from 'prop-types';
export default function Footer({title}) {
  return <div className="bg-primary text-base-100 text-center">{title} &copy;</div>;
}
Footer.propTypes = {
  // Add prop-types here
   title: PropTypes.string.isRequired,
};