6/27

We worked collaboratively to set up the Docker-compose.yaml file and were able to get our project up and running. We are using a FARM stack for this project, meaning FastApi, React, and MongoDB. Also, we began working on back end code for login and authorization.


6/28

We are using an authentication library called "jwtdown-fastapi". All of the sign in, login, logout, token and authentication functionalities were completed today. The endpoints are working correctly in FastAPI. We worked as a team and wrote all features. I wrote the first issue related to logging in.


6/29
We have made solid progress already on our backend endpoints. Sara got the GET function working for all parks from our third party API, which is the NPS API. NPS stands for National Park Service. This was a big step. I added the endpoint to get an individual park, and also secured our API key by moving it to an env file and adding it to the docker compose yml file.


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

It was another very productive day as we also completed the login page, the basic wishlist page, and the link from the state list page to the individual park details page. We have been working together collaboratively taking turns coding. When I say we "completed" the pages, I mean we have the basic functionality down and it is working as expected. We will work on the aesthetics later by going back and adding the frontend styling.


7/13
We continued to add to the foundation of the project. Main additions today were adding the park review form and the basic park details page. The review form uses redux to change the state with mutations. This means we have also been adding to the apiSlice file. The park details page still needs to have the reviews added for each individual park.


7/14
Brad and I teamed up to complete writing the issues for the project. We wrote all these issues for some of the features we have already completed and also for the upcoming additions we haven't made yet. We also added the required code to add the reviews for each park to the details page.

Today was also a big day for unit tests. We worked together to complete the unit tests for the majority of the project. There may be more endpoints that we will add for extra features, which will need accompanying tests later.


7/17
We had a bit of a blocker when trying to get us all on the same page with git. The unit tests for parks were done last. Some of the previous tests were no longer passing that did before. I realized that Sara and I had updated the model for "review out" to include the username field while we were adding reviews to the details pages. That meant the tests for reviews needed to be updated to reflect the change. All tests are now passing again.

Added code today for the MyReviews page, including the redux query and mutations.Also started to add the live chat feature that use WebSockets.

7/18
Today the main additions related to the wishlist. We realized that the model was missing the parkCode, so that had to be added to link to the review. This meant adjusted other moving parts in addition to the model. We also had to update redux and unit tests to account for the changes.

7/19
We worked as a team on the error handling related to signing up and logging in, making sure passwords matched and that the username wasn't already taken. Also, adding star selector function to enhance the user experience with rating parks.

7/20
The overall functionality is pretty solid overall and we shifted towards starting the design today. We added bootstrap components to different sections of the project. We used cards for the list of parks by state and we used bootstrap tables for wishlist, visited , and my reviews. Sean and I started working on the park details page. We ran into a blocker with listing the park activities in columns and having the reviews adjacent to them. We're having issues arranging the activities in columns. We may have to deviate from our original plan on the wireframe for practical reasons. If we did columns like the main page with activities on one side and reviews on the other, they wouldn't align and will look awkward if a park has either many activities or many reviews. One side only will extend down. Stacking the activities above the reviews makes more sense.

7/24
Completed the park details page. The solution was to add useState to create three empty columns and then fetch the activities and distribute them evenly across the columns. This was our last major part of the code base for the functionality of our project. We are essentially done and have only design choices left to make. Also completed the cleanup by running flake8 and prettier. This fixed formatting issues and we removed console.log statements.

7/27
I added some additional CSS styling to make it more visually appealing, including a custom 404 error page and a favicon. As a group we want this to look like a professional project. We've all worked very hard on this and have communicated well throughout the process.

That being said, I did make a small mistake with the git timeline. CSS additions were added by a branch that I started when I was not completely up to date at that time. The merge request overrode some of teammates' additions. Fortunately, it was a relatively easy fix of just comparing the merge to the previous commit. It's a learning experience and something I need to be more aware of and careful about in the future.

Additionally, I did find an odd bug while testing the website. When one user would log out, the next user logging in would see their lists and reviews. Only when they refreshed would they see their own information. The solution was to add this function below to the Nav.jsx file:

const logoutAndRedirect = () => {
    logout();
    navigate("/");
    window.location.reload(false);
  };

It logs the user out, redirects them to home, and then reloads the page. This way it is a clean start for the next user.

7/28
Carefully combed over the project one last time to remove minor warnings or errors that still remained. We thoroughly tested the functionality and added some nice cosmetic touches. Our team also discussed plans for additional changes we'd like to implement to make the project look even more professional than the submission we have ready at this point.
