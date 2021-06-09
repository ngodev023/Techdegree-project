# Techdegree project number 9 REST API with Express

Submitting Project 9: Aiming for Exceeds expectation, but will settle for less.

* Api can be started via running npm start, which then proceeds to run at http://localhost:5000
* Connection to DataBase Successful will be logged into the console... like a needle in a haystack.

* database has already been emptied, awaiting user to run npm run seed

* I've checked out the POSTMAN JSON collection and ran each request, and they've produced the desired results. 

* There's an odd feature associated with the create course route: When a user creates a course, he/she may choose to leave out the userId input in the request body, but the api will automatically assign the user's id for him/her. If a user then wants to reassign the course to another user, he can do so via a PUT/update request, by setting the userId to another's--heck, he could do that while setting up the course... at least on Postman. Having looked forward to Project 10, I don't think a situation like this will ever arise as the ui for public clients won't allow them to meddle with the userId of a course being generated, but I hope it doesn't hurt to leave this in the code.