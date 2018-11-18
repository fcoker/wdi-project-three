function loginCtrl($scope, $state, $auth) {
  $scope.handleLogin = function() {
    console.log('Logging in!');
    $auth.login($scope.user)
    //!!IVE GIVEN OUR INDEX VIEW A STATE NAME DOWN HERE FOR PAGE TO BE REDIRECTED TO ONCE LOGGED IN
      .then(() => $state.go('eventsIndex'))
      .catch(err => console.log('There was an error', err));
  };
}

export default loginCtrl;
