// This file contains the code for the header.

import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">FSJS Tech Degree Unit 10</Link>
          </h1>
          <nav>
            {authUser ? (
              <ul className="header--signedin">
                <li>{`Hey ${authUser.firstName} ${authUser.lastName}!`}</li>
                <li>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </ul>
            ) : (
              <ul className="header--signedout">
                <li>
                  <Link className="signup" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="signin" to="/signin">
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    );
  }
}