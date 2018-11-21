function showCtrl($state, $scope, $http) {
  $scope.comment = {};
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.eventId}`
  }).then(result => {
    $scope.event = result.data;
    $scope.attending = result.data.attendees.find(att => att.attendee._id === $scope.userId);
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
}

export default showCtrl;
