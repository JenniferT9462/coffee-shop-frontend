// components/Navbar.js
import PropTypes from 'prop-types';
// import '../styles/navbar.css';


export default function NavBar({ title, items }) {
  return (
    <div className='navbar'>
      <div>NavBar Component {title} </div>
      <div>{items}</div>
    </div>
  )
}
NavBar.propTypes = {
  // Add prop-types here
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,

};