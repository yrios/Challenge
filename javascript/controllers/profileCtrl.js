challengeApp.controller('profileCtrl', function ($scope, Modal, $routeParams, Services, $http, Pagination, SessionStorage, $location) {
    
    $scope.numPerPage = 3;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.tweets = [];
    $scope.currentuser = currentuser;
    $scope.profile = "";
    $scope.label = "";
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
            if($scope.profile == undefined){
                $location.path("/main");
            }else{
                var response = Services.SendAjaxRequest("GET", "", "/profile/get_tweets/"+encodeURIComponent($scope.profile.twitterAccount)+"/"+$scope.profile.id);
                response.then(function(data) {
                    $scope.tweets = data.body;
                    $scope.setPage();      
                });
            }    
        });
    };
    
    $scope.editEntry = function(entry){
        SessionStorage.save("entry", entry);
        $location.path("/entry/edit");
    };
    
    $scope.hidden = function(isOwner,isHidden){
        if(isOwner){
            return false;
        }else if(isHidden){
            return true;
        }else{
            return false;
        }
    };
    
    $scope.hideUnhide = function(index, operation){

        $scope.data = { id      : $scope.tweets[index].id_str,
                        user_id : $scope.profile.id
                    };
                    
        var form = $.param($scope.data);
                        
        if(operation == "hide"){

            var response = Services.post(form,'/profile/hide');
            response.then(function(data) {
                console.log(data);
                $scope.tweets[index].action = "un-hide"
                if(!$scope.$$phase) {
                     //$digest or $apply
                     $scope.$apply(); //Update local object
                 }
            });  
        }else{

            var response = Services.post(form,'/profile/unhide');
            response.then(function(data) {
                console.log(data);
                $scope.tweets[index].action = "hide"
                if(!$scope.$$phase) {
                    //$digest or $apply
                    $scope.$apply(); //Update Local object
                }
            });
        
        }
    };
    
    $scope.getProfile();
    $scope.getEntriesByUsername();
});

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
};

