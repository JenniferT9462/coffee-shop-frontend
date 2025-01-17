import PropTypes from "prop-types";
import Button from "./Button";
import { useState } from "react";

function checkPassword(password) {
  if (password.length > 8) {
    return true;
  } else {
    return false;
  }
}
// Custom Hook
const usePasswordInput = (e) => {
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const onPasswordChange = (e) => {
    if (checkPassword(e.target.value)) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
    console.log(e.target.value);
    setPasswordValue(e.target.value);
  };
  return { passwordValue, passwordIsValid, onPasswordChange };
};

export default function SignUpForm({ buttonLabel, title, handleSignUp }) {
  const { passwordValue, passwordIsValid, onPasswordChange } =
    usePasswordInput();

  const [emailValue, setEmailValue] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // // Example usage:
  // const email = "example@example.com";
  // if (emailRegex.test(email)) {
  //   console.log("Valid email address.");
  // } else {
  //   console.log("Invalid email address.");
  // }
  
  function onEmailChange(event) {
    const newEmailValue = event.target.value;
    if (newEmailValue.includes("@")) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmailValue(event.target.value);
  }

  return (
    <div className="hero bg-base-100 min-h-screen text-primary">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">
            <b>"Join Our Coffee Lovers Community!"</b>
            Discover exclusive offers, early access to new brews, and tips to
            elevate your coffee experience. Sign up now to stay in the loop and
            make your mornings even more special. Let's brew happiness together!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                onChange={onEmailChange}
                value={emailValue}
                required
              />
            </div>
            <div
              className={
                emailIsValid ? "invisible text-xs" : "text-xs text-red-400"
              }
            >
              Supply a valid email address.
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="password"
                value={passwordValue}
                onChange={onPasswordChange}
                className="input input-bordered"
                required
              />

              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div
              className={
                passwordIsValid ? "invisible text-xs" : "text-xs text-red-400"
              }
            >
              Password must be at least 8 characters long.
            </div>
            <div className="form-control mt-6">
              <Button
                className="btn btn-primary"
                label={buttonLabel}
                handleClick={handleSignUp}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

SignUpForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
