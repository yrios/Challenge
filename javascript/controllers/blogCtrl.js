
challengeApp.controller('blogCtrl', function($scope, Services, Pagination) {
    
    $scope.numPerPage = 3;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.currentuser = currentuser;
    
    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.entries = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        $scope.entries = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    $scope.getEntries = function () {
        var response = Services.SendAjaxRequest("GET", "", "/entry/get_entries", "");
        response.then(function(data) {
            $scope.bigtotal = data.body;
            $scope.setPage();      
        });
    };
    
    $scope.getEntries();
});
