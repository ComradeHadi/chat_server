'use strict';

/**
 * @ngdoc function
 * @name angularBootstrapCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularBootstrapCalendarApp
 */
//angular.module('mwl.calendar')
  myApp.controller('MainCtrl2', function ($scope, $modal, moment) {

    var currentYear = moment().year();
    var currentMonth = moment().month();


      $scope.events = [
          {
              title: 'My second tt event title', // The title of the event
              type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
              starts_at: new Date(2015,4,1,1), // A javascript date object for when the event starts
              ends_at: new Date(2015,4,26,15), // A javascript date object for when the event ends
              editable: false, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
              deletable: false // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
          }
      ];
    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();

    function showModal(action, event) {
      $modal.open({
        templateUrl: 'modalContent.html',
        controller: function($scope, $modalInstance) {
          $scope.$modalInstance = $modalInstance;
          $scope.action = action;
          $scope.event = event;
        }
      });
    }

    $scope.eventClicked = function(event) {
      showModal('the event is Clicked', event);
    };

    $scope.eventEdited = function(event) {
      showModal('Edited', event);
    };

    $scope.eventDeleted = function(event) {
      showModal('Deleted', event);
    };

    $scope.setCalendarToToday = function() {
      $scope.calendarDay = new Date();
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();

      event[field] = !event[field];
    };

  });
