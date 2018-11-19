function showCtrl($state, $scope, $http) {
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.userId}`
  }).then(result => {
    console.log(result.data);
    $scope.user = result.data;
  });
}

export default showCtrl;
