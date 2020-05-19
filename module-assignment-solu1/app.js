(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checknoofDishes = function () {

    $scope.message = countnoofDishes($scope.dishes);
  };

  function countnoofDishes(dishes) {
    var cnt = 0;
    if (dishes) {
      var array = dishes.split(',');
      for (var idx in array) {
        if (array[idx].trim().length != 0) {
          cnt=cnt+1;
        }
      }
    }
    if(cnt==0)
    {
      return "Please enter the data first";
    }
    else if(cnt<=3)
    {
      return "Enjoy!";
    }
    else
      {
        return 'Too much!';
      }

  }


}

})();
