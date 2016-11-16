angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', function ($scope) {


}])
//     //http://jsfiddle.net/2MbZY/
//.factory('basket', function () {
//    var items = [];
//    var myBasketService = {};

//    myBasketService.addItem = function (item) {
//        item.push(item);
//    };

//    myBasketService.removeItem = function (item) {
//        var index = item.indexOf(item);
//        item.splice(index, 1);
//    };

//    myBasketService.items = function () {
//        return items;
//    };

//    return myBasketService;
//})

.controller('CategoriesCtrl', function ($scope,$stateParams, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/categories_modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.data = {
        showDelete: false
    };

    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });
    
    //there are categories to pull
    if (localStorage.getItem("categories") !== null && localStorage.getItem("categories") !== undefined) {
        $scope.categories = JSON.parse(localStorage.getItem("categories"));
       
    }
     //create an empty list for categories
    else {
        $scope.categories = [];
    }

    $scope.onItemDelete = function (category) {
        console.log(category);
        $scope.categories.splice($scope.categories.indexOf(category), 1);
        if (JSON.parse(localStorage.getItem("items"))) {
            items = JSON.parse(localStorage.getItem("items"));
            delete items[category.name];
            localStorage.setItem("items", JSON.stringify(items));
        }
        localStorage.setItem("categories", JSON.stringify($scope.categories));
    };
    
    $scope.addCat = function (category) {
        if (category !== '') {
            $scope.categories.push(category);
            localStorage.setItem("categories", JSON.stringify($scope.categories));
        }
    };
    console.log("categories and stuff");
    console.log($scope.categories);
}) 

.controller('CategoryCtrl', function ($scope, $stateParams, $ionicModal, $ionicPlatform) {

    $scope.data = {
        showDelete: false
    };

    $ionicModal.fromTemplateUrl('templates/item_modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });

    $scope.category = $stateParams.categoryName;
    category = $scope.category;
   
    //get the items dictionary/list
    if (localStorage.getItem("items") !== null && localStorage.getItem("items") !== undefined) {
        $scope.items = JSON.parse(localStorage.getItem("items"));
        $scope.items = $scope.items[category];
    }
        //create empty dictionary/list
    else {
        $scope.items = {};
        localStorage.setItem("items", JSON.stringify($scope.items));
    }

    $scope.onItemDelete = function (item) {
        delete $scope.items[item];
        items = JSON.parse(localStorage.getItem("items")) || {};
        items[category] = $scope.items;
        localStorage.setItem("items", JSON.stringify(items));
    };


    //for marking as checked 
    $scope.checked = function (item, itemName) {
        console.log("scope.checked");
        console.log(item);
        items = JSON.parse(localStorage.getItem("items"));
        //if checked
        if (item) {
            items[category][itemName] = "checked";
            localStorage.setItem("items", JSON.stringify(items));
        }
        else {
            items[category][itemName] = "unchecked";
            localStorage.setItem("items", JSON.stringify(items));
        }
    };

    $scope.addItem = function (item) {
        if(item !== ""){
        items = JSON.parse(localStorage.getItem("items")) || {};
        name = item.name;
        if (items[category] === undefined) {
            items[category] = {};
            items[category][name] = "unchecked";
        }
        else {
            items[category][name] = "unchecked";
        }
        localStorage.setItem("items", JSON.stringify(items));
        $scope.items = items[category];
        }
    };
    //console.log(items);
});
