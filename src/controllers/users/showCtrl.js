function showCtrl($state, $scope, $http) {
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.userId}`
  }).then(result => {
    result.data.eventsAttending.sort(function(event1, event2){
      return new Date(event1.date) - new Date(event2.date);
    });
    $scope.user = result.data;
  });
}

export default showCtrl;
