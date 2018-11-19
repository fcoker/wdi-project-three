function editCtrl($scope, $state, $http) {
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.eventId}`
  }).then(result => $scope.event = result.data);
  $scope.editEvent = function() {
    $http({
      method: 'PUT',
      url: `/api/events/${$state.params.eventId}`,
      data: $scope.event
    }).then(() => $state.go('eventShow', { eventId: $state.params.eventId }));
  };
}

export default editCtrl;
