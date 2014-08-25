challengeApp.controller('userCtrl', function($scope, Services, $http, Modal) {
    
    var modalContent = null;
    $scope.entry = "";

    $scope.createUser = function(){
        
        $scope.data = { username            : $scope.username,
                        email               : $scope.email,
                        password            : $scope.password,
                        password_confirm    : $scope.password_confirm,
                        about               : $scope.about,
                        twitter             : $scope.twitter
        };
        
        var form = $.param($scope.data);
        
        var response = Services.post(form,'/auth/create_user');
        response.then(function(data) {
            console.log(data);
            if(data.body.succes){
                modalContent = { status: "success", title: "Entry", text: data.body.message };
                Modal.openAlert(modalContent);
                $scope.login($scope.data.username,$scope.data.password);
                
            }else{
                modalContent = { status: "danger", title: "Entry", text: data.body.message };
                Modal.openAlert(modalContent);
            }     
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
    
});
