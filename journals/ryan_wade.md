

6/27

We worked collaborately to set up the Docker-compose.yaml file and were able to get our project up and running. We are using a FARM stack for this project, meaning FastApi, React, and MongoDB. Also, we began working on back end code for login and authorization.


6/28

We are using an authentication library called "jwtdown-fastapi". All of the sign in, login, logout, token and authentication functionalities were completed today. The endpoints are working correctly in FastAPI. We worked as a team and wrote all features. I wrote the first issue related to logging in.


6/29
We have made solid progress already on our backend endpoints. Sara got the GET function working for all parks from our third party API, which is the NPS API. NPS stands for National Park Service. This was a big step. I added the endpoint to get an idividual park, and also secured our API key by moving it to an env file and adding it to the docker compose yml file.


6/30
Excellent progress thus far as all 19 of our backend endpoints are set up and working correctly in FastAPI. We rotated "drivers" meaning one person did the coding for some endpoints and the others watched and we talked through each step. Each individual has also set up some of the models. We had a minor blocker with the final end deleting a review. It was possible to delete a newly created view, but not if a view had been updated. This was resolved after some adjustments to the related queries file.


7/10
We had a week off for a summer break. Our first day back was very productive as we started the React front end. I started coding the outline of the project with templates for different pages, also setting up the nav bar, and app.js. Then, we set up the basic functionality that underlies the home page. We have links to each of the 50 states connected to the NPS API endpoints that gets all parks for the state. We also set up the list page that the links connect to, with basic data including images for the park.


7/11
We had a blocker in that I noticed some of the links to individual state pages weren't loading. Upon inspection, we found that if a state had a park without an image it would not load as that data was expected to be there. We adjusted the code from this:

 <td><img src={park.images[0].url} alt={park.fullName} /></td>

to this:

<td>{park.images && park.images.length > 0 && (<img src={park.images[0].url} alt={park.fullName} />)}</td>

Note: This is only a temporary solution, as the list now has an empty space for the parks without an associated image. I plan to make an image (maybe the logo for our website, with "image coming soon") to insert in these places later.

As a group, we also began implementing the code to use Redux to manage state throughout the project. We began with the routes for sign up and authentication.


7/12
Brad completed a major step in adding a clickable map on the homepage to link to each state list page. We had a blocker in that the module didn't load for everyone when docker rebuilt. We had to do a force install, which is something we need to make sure won't cause issues later.  We'll want to run the docker file on other computers to test if it loads correctly in new environments.

We had a small blocker with the sign up form we completed yesterday in that I noticed it successfully redirected to the homepage, but did not save the new user to the database. We were trying to enter a new user with only username and password. When I added the "Full Name" field on the form it matched our backend requirements and worked correctly, saving new users to the database.

It was another very productive day as we also completed the login page, the basic wishlist page, and the link from the state list page to the individual park details page. We have been working together collaboratively taking turns coding. When I say we "completed" the pages, I mean we have the basic functionality down and it is working as expected. We will work on the aestetics later by going back and adding the frontend styling.


7/13
We continued to add to the foundation of the project. Main additions today were adding the park review form and the basic park details page. The review form uses redux to change the state with mutations. This means we have also been adding to the apiSlice file. The park details page still needs to have the reviews added for each individual park.


7/14
Brad and I teamed up to complete writing the issues for the project. We wrote all these issues for some of the features we have already completed and also for the upcoming additions we haven't made yet. We also added the required code to add the reviews for each park to the deatils page.

Today was also a big day for unit tests. We worked together to complete the unit tests for the majority of the project. There may be more endpoints that we will add for extra features, which will need accompanying tests later.


7/17
We had a bit of a blocker when trying to get us all on the same page with git. The unit tests for parks were done last. Some of the previous tests were no longer passing that did before. I realized that Sara and I had updated the model for "review out" to include the username field while we were adding reviews to the details pages. That meant the tests for reviews needed to be updated to reflect the change. All tests are now passing again.
