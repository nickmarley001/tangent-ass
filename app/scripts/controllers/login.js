'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('tangentAssApp')

  .controller('LoginCtrl', function ($scope,$http,$rootScope,$cookies,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      $scope.username = '';
      $scope.password = '';

      $scope.logging = function(){

          $scope.user = {
              'username': $scope.username,
              'password': $scope.password
          };

          $http.post('http://userservice.staging.tangentmicroservices.com:80/api-token-auth/',$scope.user)
              .success(function (data) {

                  $cookies.put('Auth',data.token);

                  $http.defaults.headers.common = {
                      'content-type': 'application/json',
                      'Authorization': 'Token ' + $cookies.get('Auth')
                  };


                  $http.get('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/')
                      .success(function (response){
                          $rootScope.PostData = response;
                          $rootScope.items = response.length;
                          console.log('object is',$rootScope.active);
                      })
                      .error(function (error, status){

                          console.log(status);
                      });

                    $cookies.put('projects',$rootScope.PostData);
                  console.log($cookies.get('projects'));
                  $location.path('/projects');

          });
      };
