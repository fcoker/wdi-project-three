
# **Project 3: EventZ** <img align="right" src="https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67"/>
## Overview
EventZ - is an online event planner app. Users can browse, create, attend and keep track of  events. It is designed mobile-first and displays the location of an event on the map.

This was my third project as part of the General Assembly Web Development Immersive course. The objective was to build a full stack(MEAN) web application using Angular in **one week**.

Launch on [Heroku](https://eventz-planner.herokuapp.com/). Check out the GitHub [Repo](https://github.com/ShamSZ/wdi-project-three).


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

This was the first group project, we had free-roam on what app to build, as long as we stuck to the brief.
My main criteria for this project was to gain experience working with an external API and maps.

Together with Femi and Grant from my class, we decided on the idea for the app and began by planning our features and what models we would need. We agreed on what to include in the MVP. The planning didn't stop there, we were constantly thinking of new things to add and working to implement them. One of the more complex features we had intended on were friendships and attendees.

To ensure we were on the same page about the app, we made our wireframes separately and compared them. This made it easier to explain our ideas and we collectively decided on which ones to pursue.

![wireframes1](/readme-images/sham-wireframes.jpg)

![wireframes2](/readme-images/femi-wireframes.jpg)

Planning before layout & styling:
![wireframes3](/readme-images/sham-wireframe3.jpg)

### Trello

Using Trello, we broke down everything we could think of into smaller tasks - this allowed us to effectively delegate tasks and set up the basic app relatively quickly. We could keep track of who was doing what, what stage they were at and what was left to do. Below is what the board looked like at the end:

![trello](/readme-images/trello.png)

### Functionality
#### Attendees
I was tasked with implementing the attendees and so created an array of attendees on the event model referencing the user model as an attendee. From `/models/event.js`:

``` JavaScript
const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  attendees: [
    {
      attendee: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
  ]
})
```

#### Location autofill
When creating or editing an event, we needed to input an accurate address for the map to display the correct location. To avoid having to do this, we used the location input to search for the location name in  OpenStreetMap's nominatim API and display the top 5 matching results. The user could then pick the most relevant(correct) address from a drop-down list. From `/src/controllers/events/newCtrl.js`:

``` JavaScript
$scope.findPlaces = function() {
  $http({
    method: 'GET',
    url: `https://nominatim.openstreetmap.org/search/${$scope.searchTerm}?format=json&limit=5`
  }).then(result => {
    $scope.searchResults = result.data;
  });
};
```


#### Featured Piece of Code no. 1
This extract of code is responsible for removing the current user from an event's attendees array. It checks if the current user is already attending and filters through the array of attendees, removes the current user and then saves the event.
From `/controllers/eventController.js`, to remove:

``` JavaScript
if (!event.attendees.find(att => att.attendee.toString() === req.tokenUserId)) {
  res.status(422).json({ message: 'Must first be an attendee in order to remove.'});
} else {
  event.attendees = event.attendees.filter(x => x.attendee.toString() !== req.tokenUserId);
  console.log('removed!');
  return event.save();
}
```

#### Featured Piece of Code no. 2
When editing the location of an existing event, I wanted the previous location to populate and be visible to the user. However, this presented a problem, as this input was a two-way binding ng-model, I couldn't use another ng-model for the searchTerm to overwrite it and look up an address. I overcame this by adding a disabled input field, that would display the previous and newly selected location, and also a normal input that would act as the ng-model for searchTerm.

From `/src/views/events/eventEdit.html`:

``` HTML
<label class="label">Location</label>
<input class="input" ng-model="searchTerm" ng-change="findPlaces()">
<input class="input" ng-model="event.location" disabled>

<div class="search-results drop-search">
  <div class="result" ng-repeat="place in searchResults"
    ng-click="handleSelection(place)">
    <p class="result-place">{{ place.display_name }}</p>
  </div>
</div>
```
![edit location input](/readme-images/edit-location.png)



## Screenshots

**At MVP**

![mvp1](/images/mvp1.png)
![mvp2](/images/mvp2.png)

**Before final layout tweaks**

![layout](/images/pre-style.png)

### Final Product

Index page:

![index1](/images/index1.png)
![index2](/images/index2.png)

Show page:

![show1](/images/show1.png)
![show2](/images/show2.png)

Basket:

![basket](/images/basket.png)

Profile(logged in as **customer**):

![customer](/images/customer.png)

Profile:
![admin](/images/admin.png)

Add new product:

![add](/images/add.png)

Statistics:

![statistics](/images/statistics.png)


## Bugs
Below is a list of some of the known bugs within the app:

* iFrame - if the iFrame is given an incorrect YouTube url, the show page won't render correctly, duplicating itself within the frame. If I had more time, I would have the input accept only the unique video ID, where the rest of the link is hardcoded.
* Search bar - when a search term is deleted partially, the state doesn't update until the search term is cleared completely.
* Rating stars - if a rating has been made, the stars don't reset if the show page is changed to another product. This is due to the ratings component being a classical component and as a result it doesn't update when the props change. I'd remedy this by adding a componentDidUpdate block to check for changes.

## Wins and Blockers

One of the problems I faced initially was expectation management; we had planned on so many features that the workload seemed enormous and the goal - unattainable within the timeframe. This resulted in unnecessary stress. We had a meeting, revised the Trello board, redefined feature priorities and allocated more time to tasks with higher complexity.

This really helped boost our group's morale and productivity.

My biggest win, was getting the featured product suggestion working after being stuck on it for what seemed like an eternity!

## Future Content

Along with fixing the known bugs, there are a number of potential future features I could implement, such as:
* Allowing user to sort index page.
* Ability to remove specific genres from suggestions.
* Show top 5 suggestions on the index page within the image slider.
* Rewriting the suggestions based on relevance score - products of higher relevance will be shown first.
* Customer support chat.
* Stock management.
* And much more!
