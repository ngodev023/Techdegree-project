# Techdegree project number 8 MySql Library Manager

Submitting Project 8: Aiming for Exceeds expectation, but will settle for less.

* App can be started via running npm start

* When app first loads, visiting the root directory will log to the console all books in the library db
	- app will then redirect user to the /books route, where all books in the library db have been sorted by year, desc, followed by author and title, asc

* All books are present in the /books route, but only 5 will appear at a time due to pagination. Clinking each link at the bottom of the app will sift through the book items
	but the route will not change, as all titles are actually already present at /books route at the initial rendering of the view.

* Search bar near the top of the /books route will filter based on title, author, year, etc... Case insensitive. Pagination denomination still applies.

* visiting nonexistent pages will all throw a 404 error in the console, and render a page-not-found template.

* In order to invoke a 500 status code error, visit /customerror route.

* Enjoy. 