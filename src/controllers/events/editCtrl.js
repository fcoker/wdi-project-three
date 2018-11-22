function editCtrl($scope, $state, $http) {
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.eventId}`
  }).then(result => $scope.event = result.data);
  $scope.editEvent = function() {
    $scope.event.location = $scope.searchTerm;
    $http({
      method: 'PUT',
      url: `/api/events/${$state.params.eventId}`,
      data: $scope.event
    }).then(() => $state.go('eventShow', { eventId: $state.params.eventId }));
  };
  $scope.findPlaces = function() {
    $http({
      method: 'GET',
      url: `https://nominatim.openstreetmap.org/search/${$scope.searchTerm}?format=json&limit=5`
    }).then(result => {
      $scope.searchResults = result.data;
    });
  };
  $scope.handleSelection = function(place) {
    console.log(place);
    $scope.searchTerm = place.display_name;

    $scope.searchResults = null;
  };
}

export default editCtrl;
