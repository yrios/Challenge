
challengeApp.controller('mainCtrl', function ($scope, Modal, Services, $http, Pagination, SessionStorage, $location) {
    
    $scope.numPerPage = 3;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.user = {"username":"","password":""};
    
    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.entries = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    };

    $scope.changed = function(page) {
        $scope.entries = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    };
    
    $scope.login = function () {
        var modalContent = null;
        var form = $.param({identity: $scope.user.username, password:$scope.user.password});
        var init_url = base_url;

        $http({method: 'POST', url: init_url+'/auth/login',data: form,headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
          success(function(data, status, headers, config) {
                if(data.succes){
                      location.reload();
                }else{
                      //alert(data.message);
                      modalContent = { status: "danger", title: "Login", text: data.message };
                      Modal.openAlert(modalContent);
                }
        });
    };
    
    $scope.logout = function () {
        var init_url = base_url;
        $http({method: 'GET', url: init_url+'/auth/logout'}).
            success(function(data, status, headers, config) {
                console.log(data);
                if(data.succes){
                    //$location.path("/login");
                    location.reload();
                }else{
                    alert(data.message);
                }
            })
        //$location.path("/login");
    };
    
    $scope.getEntries = function () {
        var response = Services.SendAjaxRequest("GET", "", "/entry/get_entries", "");
        response.then(function(data) {
            $scope.bigtotal = data.body;
            $scope.setPage();      
        });
    };
    
    $scope.editEntry = function(entry){
        SessionStorage.save("entry", entry);
        $location.path("/entry/edit");
    };
    
    $scope.getEntries();
});

challengeApp.controller('userBlogCtrl', function ($scope, Modal, Services, $http, Pagination, $routeParams, $location) {
    
    $scope.numPerPage = 3;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.pageowner = $routeParams.username;
    $scope.user = {"username":"","password":""};
    
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

    $scope.login = function (username,password) {
        var modalContent = null;
        var form = $.param({identity: username, password:password});
        var init_url = base_url;

        $http({method: 'POST', url: init_url+'/auth/login',data: form,headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
          success(function(data, status, headers, config) {
                if(data.succes){
                      location.reload();
                }else{
                      //alert(data.message);
                      modalContent = { status: "danger", title: "Login", text: data.message };
                      Modal.openAlert(modalContent);
                }
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
    
    $scope.getProfile();
    $scope.getEntriesByUsername();
});

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
};