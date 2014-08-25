saysSevenApp.controller('paramDevoCtrl', function($scope, $location, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];

    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.devo_param = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        console.log(page);
        $scope.devo_param = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    $scope.getParams = function(){

        $scope.loading = true;
        var modalContent = null;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/ParameterDevo/GetParameters", authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                $scope.loading = false;

                $scope.bigtotal = data.body.ResponseContent;
                $scope.setPage();

            }else{

                if(data.statuscode == 502){
                    modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor, por favor intente mas tarde" }
                }else if(data.statuscode == 401){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: "El usuario actual no tiene privilegios para realizar esta acción." }
                }else if (data.body.StatusDescription == "ArgumentException" || data.body.StatusDescription == "DataException"){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: data.body.ResponseContent }
                }else{ 
                    modalContent = { status: data.statuscode, title: "Error", text: "Error Interno de servidor" }
                }

                $scope.loading = false;
                Modal.open(modalContent);
            }
        });
    }

    $scope.selectItem = function(parameter){
        $scope.mySelection = parameter;
        SessionStorage.save("parameter", parameter);

        $location.path("/main/param/devo/update");
    }

    $scope.getParams();
});

saysSevenApp.controller('paramDevoUpdateCtrl', function($scope, $location, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.param = "";

    $scope.UpdateParam = function(){

        $scope.loading = true;
        var modalContent = null;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", $scope.param, "api/ParameterDevo/UpdateParameters", authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                $scope.loading = false;
                SessionStorage.save('parameter',$scope.param)
                modalContent = {status: data.statuscode, title: data.body.StatusDescription, text: "Cambios guardados exitosamente" };
                Modal.open(modalContent);

            }else{

                if(data.statuscode == 502){
                    modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor, por favor intente mas tarde" }
                }else if(data.statuscode == 401){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: "El usuario actual no tiene privilegios para realizar esta acción." }
                }else if (data.body.StatusDescription == "ArgumentException" || data.body.StatusDescription == "DataException"){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: data.body.ResponseContent }
                }else{ 
                    modalContent = { status: data.statuscode, title: "Error", text: "Error Interno de servidor" }
                }

                $scope.loading = false;
                Modal.open(modalContent);
            }
        });
    }

    $scope.getFields = function(){
        if(SessionStorage.get('parameter')){
            var parameter = SessionStorage.get('parameter');
            $scope.param = parameter;
        }
    }

    $scope.getFields();
});