import React from 'react';

export default ({context}) => {
  const authUser = context.authenticatedUser;
  console.log (authUser);
  
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} is authenticated!</h1>
      <p>Your email is {authUser.emailAddress}</p>
    </div>
  </div>
  );
}