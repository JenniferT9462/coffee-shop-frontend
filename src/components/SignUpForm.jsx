import PropTypes from "prop-types";
import Button from "./Button";

export default function SignUpForm({ buttonLabel, title }) {
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
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <Button
                className="btn btn-primary"
                label={buttonLabel}
                handleClick={() => {
                  console.log("clicked sign up");
                }}
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
