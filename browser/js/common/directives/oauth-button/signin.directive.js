'use strict';

app.directive('signin', function () {
  return {
    scope: {
      userInfo: '=',
      text: '@',
      submit: '&'
    },
    templateUrl: 'js/signin/signin.html'
  }
});
