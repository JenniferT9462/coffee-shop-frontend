// components/Navbar.js
import PropTypes from 'prop-types';
// import '../styles/navbar.css';


export default function NavBar({title}) {
  return <div className="navbar">Navbar Component {title}</div>;
}
NavBar.propTypes = {
  // Add prop-types here
   title: PropTypes.string.isRequired,
};