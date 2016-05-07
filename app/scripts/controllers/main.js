'use strict';

/**
 * @ngdoc function
 * @name nodeExperimentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodeExperimentApp
 */
angular.module('nodeExperiment')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
