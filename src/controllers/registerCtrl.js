function registerCtrl($scope, $state, $auth) {
  $scope.handleRegister = function() {
    console.log('Registered user');
    $auth.signup($scope.user)
    //!!IVE GIVEN OUR LOGIN VIEW A STATE NAME DOWN HERE FOR PAGE TO BE REDIRECTED TO ONCE REGISTERED
      .then(() => $state.go('login'))
      .catch(err => console.log('Error!', err));
  };
}

export default registerCtrl;
