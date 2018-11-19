function registerCtrl($scope, $state, $auth) {
  $scope.handleRegister = function() {
    console.log('Registered user!');
    $auth.signup($scope.user)
      .then(() => $state.go('login'))
      .catch(err => console.log('Error!', err));
  };
}

export default registerCtrl;
