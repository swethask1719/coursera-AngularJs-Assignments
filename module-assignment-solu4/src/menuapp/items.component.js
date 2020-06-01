(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/items.component.template.html',
  bindings: {
    items: '<'
  }
});

})();
