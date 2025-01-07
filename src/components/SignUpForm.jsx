import PropTypes from 'prop-types';
import Button from './Button';

export default function SignUpForm({ buttonLabel }) {
    return (
        <form className='form'>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Button label="Sign Up"handleClick={()=>{console.log("clicked sign up")}}/>
        </form>
    )
}

SignUpForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}