import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  
    // getting the authentication status from Provider component
    const {context} = props;
    const authUser = context.authenticatedUser;
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><Link to="/">Courses</Link></h1>
          <nav>
            {authUser ?
              (
                <ul className="header--signedin">
                  <li><span>Welcome, {authUser.firstName} {authUser.lastName}!</span></li>
                  <li><Link to="/signout">Sign Out</Link></li>
                </ul>
              )
              :
              (
                <ul className="header--signedout">
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><Link to="/signin">Sign In</Link></li>
                </ul>
              )
              }
            </nav>
        </div>
      </header>
      
    );
  };

