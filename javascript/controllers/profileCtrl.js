challengeApp.controller('profileCtrl', function ($scope, Modal, $routeParams, Services, $http, Pagination, SessionStorage, $location) {
    
    $scope.numPerPage = 3;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.currentuser = currentuser;
    $scope.profile = "";
    $scope.pageowner = $routeParams.username;
    
    $scope.user ={"username":"","password":""};
    
    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.entries = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    };

    $scope.changed = function(page) {
        $scope.entries = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    };
    
    $scope.getEntriesByUsername = function () {
        var response = Services.SendAjaxRequest("GET", "", "/entry/get_user_entries/"+$scope.pageowner);
        response.then(function(data) {
            $scope.bigtotal = data.body;
            $scope.setPage();      
        });
    };
    
    $scope.getProfile = function(){
        var response = Services.SendAjaxRequest("GET", "", "/profile/get_profile/"+$routeParams.username);
        response.then(function(data) {
            $scope.profile = data.body[0];
            
            var response = Services.SendAjaxRequest("GET", "", "/profile/get_tweets/"+encodeURIComponent($scope.profile.twitterAccount));
            response.then(function(data) {
                $scope.tweets = data.body;
                console.log($scope.tweets);
                $scope.setPage();      
            });
        });
    };
    
    $scope.editEntry = function(entry){
        SessionStorage.save("entry", entry);
        $location.path("/entry/edit");
    };
    
    $scope.getProfile();
    //$scope.getTweets();
    $scope.getEntriesByUsername();
});

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
};

