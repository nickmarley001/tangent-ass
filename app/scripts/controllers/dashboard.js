'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */


angular.module('tangentAssApp.controllers', [])
    .controller("DashboardCtrl", function ($scope,$http) {



/**var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects",
  "method": "GET",
  "headers": {
    "authorization": "Basic YWRtaW4xOmFkbWluMQ==",
    "cache-control": "no-cache",
    "postman-token": "479dc836-dd31-0c7c-f2a1-e3e226f35bc8"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});*/



    
$http.get('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects')
  .then(function (response) {



    var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = {

  	  "headers": {
    "authorization": "Basic YWRtaW4xOmFkbWluMQ==",
    "cache-control": "no-cache",
    "postman-token": "479dc836-dd31-0c7c-f2a1-e3e226f35bc8"
  }



    }
    var config = response.config;

    $scope.task = data;
    console.log(data);
})
  })







.controller('PostController',function($scope, $http){
  $scope.post = {};
  $scope.post.tasks = [];
  $scope.tempTask = {};
  $scope.editMode = false;
  $scope.index = '';
  
  var url = base_path+'ajax.php';
  
  $scope.saveTask = function(){
      $http({
        method: 'post',
        url: url,
        data: $.param({'task' : $scope.tempTask, 'type' : 'save_task' }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        if(data.success){
          if( $scope.editMode ){
            $scope.post.tasks[$scope.index].id = data.id;
            $scope.post.tasks[$scope.index].title = $scope.tempTask.title;
            $scope.post.tasks[$scope.index].description = $scope.tempTask.description;
            $scope.post.tasks[$scope.index].start_date = $scope.tempTask.start_date;
            $scope.post.tasks[$scope.index].billable = $scope.tempTask.billable;
            $scope.post.tasks[$scope.index].active = $scope.tempTask.active;
            $scope.post.tasks[$scope.index].task_set = $scope.tempTask.task_set;
            $scope.post.tasks[$scope.index].resource = $scope.tempTask.resource;
          }else{
            $scope.post.tasks.push({
              id : data.id,
              title : $scope.tempTask.title,
              description : $scope.tempTask.description,
              start_date : $scope.tempTask.start_date,
              billable : $scope.tempTask.billable,
               active : $scope.tempTask.active,
               task_set : $scope.tempTask.task_set,
               resource : $scope.tempT.resource,
            });
          }
          $scope.messageSuccess(data.message);
          $scope.taskForm.$setPristine();
          $scope.tempTask = {};
          
        }else{
          $scope.messageFailure(data.message);
        }
      }).
      error(function(data, status, headers, config) {
          //$scope.codeStatus = response || "Request failed";
      });
      
      jQuery('.btn-save').button('reset');
  }
  
  $scope.addTask = function(){
    
    jQuery('.btn-save').button('loading');
    $scope.saveTask();
    $scope.editMode = false;
    $scope.index = '';
  }
  
  $scope.updateTask = function(){
    $('.btn-save').button('loading');
    $scope.saveTask();
  }
  
  $scope.editTask = function(task){
    $scope.tempTask = {
      id: task.id,
      title : task.title,
      description : task.description,
      start_date : task. start_date ,
      billable : task.billable,
      active : task. active,
      task_set : task.task_set, 
      resource : task.resource
    };
    $scope.editMode = true;
    $scope.index = $scope.post.tasks.indexOf(task);
  }
  
  
  $scope.deleteTask = function(task){
    var r = confirm("Are you sure want to delete this task!");
    if (r == true) {
      $http({
          method: 'post',
          url: url,
          data: $.param({ 'id' : task.id, 'type' : 'delete_task' }),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
        success(function(data, status, headers, config) {
          if(data.success){
            var index = $scope.post.tasks.indexOf(task);
            $scope.post.tasks.splice(index, 1);
          }else{
            $scope.messageFailure(data.message);
          }
        }).
        error(function(data, status, headers, config) {
          //$scope.messageFailure(data.message);
        });
    }
  }

});


