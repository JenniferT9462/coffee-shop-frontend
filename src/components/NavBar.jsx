// components/Navbar.js
import PropTypes from 'prop-types';
// import '../styles/navbar.css';


export default function NavBar({ title, items }) {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <button className="btn btn-ghost text-xl">{title}</button>
      {items}
    </div>
  )
}
NavBar.propTypes = {
  // Add prop-types here
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,

};