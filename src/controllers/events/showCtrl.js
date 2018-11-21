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



  // NOTE: think about putting both functions into one - with an if/else block,
  //and evaluate if isAttending or not in the ctrl
  $scope.attending = function() {
    $http({
      method: 'POST',
      url: `/api/events/${$state.params.eventId}/attending`,
      data: $scope.attendee
    }).then(result => {
      $scope.event = result.data;
      $scope.isAttending = function() {
        const currentUser = result.data.attendees
          .filter(x => x.attendee.toString() !== $scope.userId)[0].attendee._id;
        if(currentUser === $scope.userId){
          //already attending
          return true;
        } else {
          //not attending
          return false;
        }
      };
    });
  };
  $scope.notAttending = function() {
    $http({
      method: 'POST',
      url: `/api/events/${$state.params.eventId}/notattending`,
      data: $scope.attendee
    }).then(result => {
      $scope.event = result.data;
    });
  };
}

export default showCtrl;
