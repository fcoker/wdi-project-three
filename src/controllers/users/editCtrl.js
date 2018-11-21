function editCtrl($scope, $state, $http) {
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.userId}`
  }).then(result => $scope.user = result.data);
  $scope.editUser = function() {
    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.userId}`,
      data: $scope.user
    }).then(() => $state.go('userShow', { userId: $state.params.userId }));
  };
}

export default editCtrl;
