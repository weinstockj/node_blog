'use strict';

/**
 * @ngdoc function
 * @name nodeExperimentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl 
 * Controller of the nodeExperimentApp
 */
angular.module('nodeExperiment')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
