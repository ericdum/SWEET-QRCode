'use strict';

/* Controllers */
myApp.controller('Canvas', ['$scope', '$location', function($scope, $location) { 
    var search = $location.search();
    if( typeof search == "object" && "text" in search ){
        console.log(search.text);
        $scope.string = decodeURIComponent(search.text);
    } else {
        chrome.tabs.query({
            highlighted: true,
            windowType: "normal"
        }, function(tab){
            if( 0 in tab && "url" in tab[0] ){
                $scope.string = tab[0].url;
                $scope.$apply();
            }
        })
    }
    $scope.version = 1;

    $scope.$watch('string', function(string){
        console.log(string);
    });
}]);
