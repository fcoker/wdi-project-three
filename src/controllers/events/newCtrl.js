import mapLib from '../../lib/map';

function newCtrl($scope, $http, $state, $auth) {
  $scope.createEvent = function() {
    $scope.event.createdBy = $auth.getPayload().sub;
    $http({
      method: 'POST',
      url: '/api/events',
      data: $scope.event
    }).then(result => $state.go('eventShow', {
      eventId: result.data._id
    })).catch(error => {
      console.log(error);
      $scope.errors = error.data;
    });
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
}


export default newCtrl;
