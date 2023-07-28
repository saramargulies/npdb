6/27

implemented get protected function for fastAPI backend

6/28

did not "drive today. we worked together on backend endpoints for showing parks by state and showing one park

6/29

completed feature to GET a wishlist

6/30

implemented endpoints for creating, updating, deleting and GETting reviews.

7/10

split coding/driving duties with Sarah and Brad on both the home page and the parks list by state pages for the front end. we had some blockers on setting up the state list on the home page but debugged as a group ang got both pages functioning by EOD.

7/11

did not drive or code today, but the team worked together on writing then refactoring front-end authorization to use REDUX.

7/12

the team spent the first part of the day implementing the react-usa-map to the home page. I added the link to the park details page from the parks list page and eventually began working on the park details page for front-end.

7/13

was not feeling well today and did not write any code for the project.

7/14

we reviewed the lectures on unit testing and began working together to write them. we eventually split up and I wrote the unit test for getting the list of parks by state, but ran into a bug which I was not able to figure out before EOD.

7/17

my teammates helped me figure out where the issue was, and a function did not match naming conventions across  the queries/routers files to the unit test, which was the cause of the bug from friday. we got that corrected and started merging the work some of us had done seperately until main was up to date and the same for all of us.

wrote the front end code for the MyReviews page using Redux, and the only remaining blocker is to the if !data or if no reviews to display the message "No reviews for this account yet", as of now if i uncomment it back in, it automatically seems to think there are no reviews for the user yet.

7/18

worked as a team making sure all the delete and mark as visited and add to wishlist buttons work in the front end. had to update ther WishlistItemIn and WishlistItemOut model to include parkCode so that we could link the review button to the reviews page, and update the apiSlice file and adjust the unit test for that function.

7/20

we worked as a team on styling some aspects of the projects, I took the reigns on starting to style the park details page but ran into a blocker with how to get the list of activities/amenities to split up into 2 or 3 different columns when using the dynamic list of activities pulled from NPS API.

7/24

got past the blocker on the park details page as a team and we passed the activities collumns into a useState and iterated over the activities to display in 3 collumns. We combed through the whole project for formatting and unused imports and console logs.

7/25-7/26

project is done aside from some additional stretch goals and styling, the team took some time to step away and study for the final assessment. the team went o ver some styling additions that Ryan and worked on and got everything applied and merged with main.

7/27-728

the team got together to debug some errors and warnings we were getting in the console, even though we were seeing functionality of the application as expected. we applied some additional styling changes as well and did a thorough test of the sites functionality and made some plans for some additional stretch goals.
