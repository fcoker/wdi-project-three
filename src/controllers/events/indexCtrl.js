function indexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/events'
  }).then(result => {
    $scope.allEvents = result.data;
    $scope.filteredEvents = $scope.allEvents;
  });

  $scope.handleFilterSubmit = function() {
    $scope.filteredEvents = $scope.allEvents.filter(event =>
      event.name.toLowerCase().includes($scope.searchTerm.toLowerCase()) ||
      event.date.toLowerCase().includes($scope.searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes($scope.searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes($scope.searchTerm.toLowerCase()) ||
      event.createdBy.toLowerCase().startsWith($scope.searchTerm.toLowerCase())
    );
  };
}

export default indexCtrl;
