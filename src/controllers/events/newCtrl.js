function newCtrl($scope, $http, $state, $auth) {
  $scope.createEvent = function() {
    $scope.event.createdBy = $auth.getPayload().sub;
    $http({
      method: 'POST',
      url: '/api/events',
      data: $scope.event
    }).then(result => $state.go('eventShow', {
      id: result.data._id
    })).catch(error => {
      console.log(error);
      $scope.errors = error.data;
    });
  };
}

export default newCtrl;
