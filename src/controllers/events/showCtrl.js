function showCtrl($state, $scope, $http) {
  $scope.comment = {};
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.eventId}`
  }).then(result => {
    $scope.event = result.data;
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
  $scope.attending = function() {
    $http({
      method: 'POST',
      url: `/api/events/${$state.params.eventId}/attending`,
      data: $scope.attendee
    }).then(result => {
      $scope.event = result.data;
      console.log('going');
      $scope.isAttending = function() {
        // if(){
        //   //already attending
        //   return true;
        // } else {
        //   //not attending
        //   return false;
        // }
      };
    });
  }
}

export default showCtrl;
