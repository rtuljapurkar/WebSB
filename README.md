WebSB
Web site for StadiumBee

Updated 06/20/2017

While testing on Internet Explorer browser I found that API calls using Fetch did not work as IE does not support Fetch. So used axios package and changed API calls to use this package.

Updated 06/15/2017

Within the past two weeks (June 1st till June 15th) the code is modified to

Remove various console warnings.
Test and fix any display issues by simulating API slow or API down conditions
Modify scores display to match the mobile version. Also, it's wider than earlier.
Hide the Team page link
Current features include responsive screens or functionality for below. Register, Login, All Posts, Favorites, Scores, Venues, Amenities, Points Of Interest/Locals 411(POI), Venue Post/Review, Amenity Post/Review, POI Post/Review, Teams

Instructions to run the project locally

Get latest and run following to get started npm install npm install --only=dev npm start

Functionality added - 5/18/2017

Login and Registration

Data list pages with sorting/filtering and paging for Venues Posts Teams Amenities Local 411

Add Venue Review/Post function
