/* This page contains the code for the sign in page. */

import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const SignIn = ({ context }) => {
  const emailAddress = useRef(null);
  const password = useRef(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await context.actions.signIn(
      emailAddress.current.value,
      password.current.value
    );
    const { from } = history.location.state || { from: { pathname: "/" } };
    history.push(from.pathname);
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            ref={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            ref={password}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
        <p>
          Don't have an account? Sign up <Link to="/signup">here</Link>!
        </p>
      </div>
    </main>
  );
};
export default SignIn;