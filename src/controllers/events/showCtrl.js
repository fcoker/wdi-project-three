import mapLib from '../../lib/map';

function showCtrl($state, $scope, $http) {
  $scope.comment = {};
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.eventId}`
  }).then(result => {
    $scope.event = result.data;
    $scope.attending = result.data.attendees.find(att => att.attendee._id === $scope.userId);
  });

  $scope.$watch('event', function(){
    if($scope.event){
      $http({
        method: 'GET',
        url: `https://nominatim.openstreetmap.org/search/${$scope.event.location}?format=json&limit=1`
      }).then(result => {

        $scope.searchResults = result.data;
        console.log('this is $scope.searchResults ', $scope.searchResults[0].lon);
        mapLib.create('map-element', [$scope.searchResults[0].lat, $scope.searchResults[0].lon], 16);
        mapLib.addMarker([$scope.searchResults[0].lat, $scope.searchResults[0].lon], $scope.event.name);
      });
    }
  });

  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/events/${$state.params.eventId}/comments`,
      data: $scope.comment
    }).then(result => {
      $scope.event = result.data;
      $scope.comment.text = null;
    });
  };

  $scope.deleteComment = function(comment) {
    $http({
      method: 'DELETE',
      url: `/api/events/${$state.params.eventId}/comments/${comment._id}`
    }).then(result => $scope.event = result.data);
  };

  $scope.deleteEvent = function() {
    $http({
      method: 'DELETE',
      url: `/api/events/${$scope.event._id}`
    }).then(() => $state.go('eventsIndex'));
  };



  $scope.attendThis = function() {
    if($scope.attending){
      console.log('not going to go, being removed');
      $http({
        method: 'POST',
        url: `/api/events/${$state.params.eventId}/notattending`,
        data: $scope.attendee
      }).then(result => {
        $scope.attending = false;
        $scope.event = result.data;
      });
    } else {
      console.log('now attending');
      $http({
        method: 'POST',
        url: `/api/events/${$state.params.eventId}/attending`,
        data: $scope.attendee
      }).then(result => {
        $scope.event = result.data;
        $scope.attending = true;
      });
    }
  };
  // Functions
  $scope.panMap = function(country) {
    mapLib.panTo(country.latlng);
    mapLib.clearMarkers();
    mapLib.addMarker(country.latlng, `<strong>${country.name}</strong><img src=${country.flag} />`);
  };

  $scope.findPlaces = function() {
    // Make a request to nominatim, using the current search term:
    $http({
      method: 'GET',
      url: `https://nominatim.openstreetmap.org/search/${$scope.searchTerm}?format=json&limit=5`
    }).then(result => {
      // result.data now has the top 5 results.
      $scope.searchResults = result.data;
    });
  };

  $scope.goTo = function(place) {
    console.log('Clicked on', place);
    // Clear the search text:
    $scope.searchTerm = null;
    mapLib.panTo([place.lat, place.lon]);
    mapLib.addMarker([place.lat, place.lon], place.display_name);
    $scope.searchResults = null;
  };

  $scope.findUser = function() {
    navigator.geolocation.getCurrentPosition(function(result) {
      mapLib.panTo([result.coords.latitude, result.coords.longitude]);
      mapLib.addMarker([result.coords.latitude, result.coords.longitude], '🌟');
    });
  };
}


export default showCtrl;
