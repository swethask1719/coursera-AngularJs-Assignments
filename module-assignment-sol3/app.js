(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


 function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      myTitle: '<title',
      items: '<',
      onRemove: '&'
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function ShoppingListDirectiveController() {
  var list = this;

}

//controller for the search form that will retrieve and manage menu items
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;    //list element from html form
  list.found = [];

  list.title = "Your Menu Items";
  list.description = "";

  list.search = function () {
    if (typeof list.description != "undefined" &&
      list.description.length){
        var promise = MenuSearchService.getMatchedMenuItems(list.description);
        promise.then(function (result) {
          list.found = result.matchedItems;
          console.log(result.message);
        }, function (result) {
          console.log(result.message);
        });
      }
  };

  list.removeItem = function (itemIndex) {
    console.log("removing item at index: "+itemIndex);
    list.found.splice(itemIndex, 1);
  };
}

//Service to get menu items from a http rest call and filter by search term
MenuSearchService.$inject = ['$q','$http']
function MenuSearchService($q,$http) {
  var service = this;
  service.url = 'https://davids-restaurant.herokuapp.com/menu_items.json';

  service.getMatchedMenuItems = function (itemDescription) {
    var deferred = $q.defer();

    var result = {
      matchedItems: [],
      message: ""
    };

    $http.get(service.url).then(function(response) {
      var menuItems = response.data.menu_items;
      for (var i = 0; i < menuItems.length; i++) {
        var menuItem = menuItems[i];
        var pos = menuItem.description.indexOf(itemDescription);
        //console.log("Menu item "+ i + "desc: "+menuItem.description);
        //console.log("found " + itemDescription + " at pos "+ pos);
        if (pos > -1) {
          result.matchedItems.push(menuItem);
        }
      }
      result.message = "SUCCESS: Found " + result.matchedItems.length + " items";
      deferred.resolve(result);
    }).catch(function(e) {
      result.message = JSON.stringify(e);
      deferred.reject(result);
    });
    return deferred.promise;
  };
}

})();
