(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  toBuy.buy = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "milk", quantity: 7 },
    { name: "chips", quantity: 5 },
    { name: "soda", quantity: 6 },
    { name: "Final Fantasy XV", quantity: 1 }];

  var boughtItems = [];

  service.buyItem = function(index) {
    boughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
