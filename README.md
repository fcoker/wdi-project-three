
# **EventZ** <img align="right" src="https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67"/>
## Overview
Eventz is a web app planner that allows users and their friends keep track of and also add new events to it. Users are able to see which shows, restaurants, plays etc, their friends are going to and also let them know in return whether or not they would be attending. This web app is mobile friendly and also uses a geolocation API to show event locations.

This was my third project of the GA Web development course and was also the first time I have worked on a coding project as a group. The timeframe for this project was also one week and the main briefing was to use Angular for the front-end.

Web Site [Heroku](https://eventz-planner.herokuapp.com/).
GitHub [Repo](https://github.com/fcoker/wdi-project-three).


## Brief

* Use **Mongo, Node & Express** to build a server-side API
* **Your API must have at least 2 related models**, one of which should be a user
* Your API should include **all RESTFUL actions** for at least one of those models
* Include **authentication** to restrict access to appropriate users
* Include at least one **referenced** or **embedded** sub-document
* **Include automated tests** for at least one resource
* Use **Angular** to build a front-end that consumes your API

* Use **SCSS** instead of **CSS**

* Use **Webpack & Yarn** to manage your dependencies and compile your source code

## Technologies Used

* Angular
* JavaScript (ES6)
* HTML5
* SCSS
* Bulma CSS Framework
* Git
* GitHub
* Bcrypt
* JWT
* Moment.js
* Mongoose
* Heroku
* Trello
* Yarn
* Chai
* Mocha
* Leaflet.js map
* OpenStreetMap API

## Approach Taken

I was teamed up with Grant and Sham from my course and we collectively decided that we wanted to build an events planning app. It was agreed that this sort of app would be an excellent platform that is flexible enough to incorporate a large amount of features. I was particularly keen on including a map in this project because I did not have enough time to add one in my previous project.

We began by planning our models and what we wanted our MVP to look like. It was then decided that we individually produced wireframes and then compare and agree which layout route to go.

#### Wireframes
![wireframes1](/readMeImgs/wf1.jpg)
![wireframes2](/readMeImgs/wf2.jpg)
![wireframes2](/readMeImgs/wf3.jpg)
![wireframes2](/readMeImgs/wf4.jpg)

Finally before we started and after we went through our process, we broke down all the tasks we could think of and assigned ourselves to the various jobs.

We used Trello to keep track of this. This was the first time I had used a platform like this and found it highly effective. We could keep track of who was doing what and also what stage we all were at the project. As a result of this MVP was reached relatively quickly.

#### Trello Board
![trello](/readMeImgs/trello.png)



## Featured Code 1
The code below is responsible for the events exact location being shown on a map once the show page is opened. An external API called nominatim and openstreetmap was used for this. Once the show page of an event is loaded, its exact location details are found by nominatim then converted to Json format where the longitude and latitude are used by openstreetmap to create a map with a marker on the exact location of the event.

``` JavaScript
$scope.$watch('event', function(){
  if($scope.event){
    $http({
      method: 'GET',
      url: `https://nominatim.openstreetmap.org/search/${$scope.event.location}?format=json&limit=1`
    }).then(result => {
      $scope.searchResults = result.data;
      mapLib.create('map-element', [$scope.searchResults[0].lat, $scope.searchResults[0].lon], 16);
      mapLib.addMarker([$scope.searchResults[0].lat, $scope.searchResults[0].lon], $scope.event.name);
    });
  }
});

```

## Featured Code 2
Moment.js was used below to make sure that whatever date input was put into the create or update forms would be recognised and rearranged to one uniform date and time format.

``` JavaScript
function createRoute(req, res, next) {
  req.body.createdBy = req.tokenUserId;
  req.body.date = moment(req.body.date).format('DD MMMM YYYY, HH:mm');
  req.body.dateTo = moment(req.body.dateTo).format('DD MMMM YYYY, HH:mm');
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}
```

## Screenshots

**Home page:**
![home](/readMeImgs/landingPage.png)

**Register page:**
![register](/readMeImgs/register.png)

**Index page:**
![index](/readMeImgs/index.png)

**Show page:**
![show](/readMeImgs/show.png)

**Profile page:**
![profile](/readMeImgs/userProfile.png)

**Edit profile page:**
![profile-edit](/readMeImgs/userProfileEdit.png)

**Event edit:**
![autofill](/readMeImgs/eventEdit.png)

## Bugs
Below is a list of some of the known bugs within the app:

* Edit event - The event date doesn't populate. I could try to resolve this by setting value to an ISO date format.
* Location select - When picking a location suggestion from the drop-down list, it doesn't allow the user to insert a house number or extra info on the address input.

## Wins and Blockers

The biggest blocker I personally faced was trying to get a route or possible distance between the user and the event location on the map on the show page. I was able to get the user location and the event location markers to appear on the same map but I was not able to get the zoom feature to automatically adjust to show both markers on the same screen at the same time. I eventually had to give up on this due to time.

A win for me was ironically, compared to my other projects time management. I feel that working as a team and having tasks delegated to team members greatly helped in time management. I was able to focus on the tasks assigned to me without worrying about other parts of the project I haven't yet done. Another win for me was getting the map to work showing the event location.

The experience of working with a team was the greatest win for me.

## Future Content

Along with fixing the known bugs, there are a number of potential future features I could implement and complete, such as:
* Visible directions from user to event location.
* Links on the event show page to booking process for selected event.
* Friendships - adding and removing friends(both have to accept).
* Eventually inviting friends to events
* Messaging
* Expire old events into a Past events section
* Adding straight-line and actual walking/driving distance from user to event
* An index map - showing all events in an area
* Private events
* And much more!
