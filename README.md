# Techdegree project number 10 React App with Restful Api

Submitting Project 10: Aiming for Exceeds expectation, but will settle for less.

* Upon downloading project file, user should open up a cli and change into the api directory and run npm start to start up the database api which will run at http://localhost:5000

* user should then open up another command line at the root of the project directory, change into the client directory, which is adjacent to the api directory and run npm start again, which will host a react application, accessible via browser at http://localhost:3000

* api has been modified to allow cross origins resource sharing, and header locations have been configured to be accessible in the response

* user can go ahead and sign up for an account with any unused email address and begin creating courses.

* Signing up with qualifiable information will automatically sign the user in--user's first and last name will appear in the header, alongside the sign-out option so long as the user remains logged in.
	- follow the validation error instructions to rectify your information inputs if you run into any error

* User should arrive at the courses listing upon accessing localhost:3000

* User should be able to view the course details on any course, whether logged in or out

* User can choose to create a course, a feature which requires that a user is logged in and authenticated; user will be redirected to signing screen to sign in; and then redirected to whichever page user was on after a successful sign-in

* Once again, trying to create a course with insufficient information will result in validation errors becoming visible to the user; follow these instructions to rectify your inputs if you run into any error

* Once a course has been successfully created, client will be redirected to the course detail page of the newly created course... no need to go back to the course listing page and look for it.

* A course detail page will make the option to edit or delete the course visible--if the logged in user is the owner of the course--trying to access this feature by messing with the url will result in a forbidden error

* Editing a course follows the same validation rules as creating a course. Follow the message's instructions if you run into any error

* Enjoy!