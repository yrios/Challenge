saysSevenApp.controller('devoCtrl', function($scope, $location, $interval, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.format = 'MM/dd/yyyy';
    $scope.radicado = "";
    $scope.identity = "";
    $scope.setDisabled = true;
    $scope.devo = "";
    $scope.total = 0.0;
    $scope.options = [];

    $scope.open = function($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();

        if(opened == "date1"){
            $scope.date1 = true;
        }
    };


    $scope.getParams = function(){
        var authToken = UserSession.readCookie("authToken");

        operations.then(function(opr) {
            var response = Services.SendAjaxRequest("GET", "", "api/ParameterDevo/GetParameters", authToken);
            response.then(function(data) {
                if(data.body.StatusDescription == "success"){
                    
                    SessionStorage.save("paramDevo", data.body.ResponseContent);
                    $scope.params = data.body.ResponseContent;

                    for (var i = 0; i < $scope.params.length; i++) {
                        $scope.options.push({text: $scope.params[i].Descripcion, value: $scope.params[i].Id});
                    };

                }else{

                    if(data.statuscode == 502){
                        modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor" }
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
        })

        
    }

    $scope.getDevo = function(){

        $scope.loading = true;
        var modalContent = null;

        var id = $scope.identity;
        var radicado = $scope.radicado;
        var parameter = $scope.filter.value;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/Devo/Get?id="+id+"&radicado="+radicado+"&param_id="+parameter, authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                $scope.loading = false;
                $scope.total = 0.0;
                $scope.setDisabled = false;
                SessionStorage.save("devo", data.body.ResponseContent);
                $scope.devo = data.body.ResponseContent;

                for (var i = 0; i < $scope.devo.vDetalleField.length; i++) {
                    $scope.total += $scope.devo.vDetalleField[i].dfa_valoField;
                };

            }else{

                if(data.statuscode == 502){
                    modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor" }
                }else if(data.statuscode == 401){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: "El usuario actual no tiene privilegios para realizar esta acción." }
                }else if (data.body.StatusDescription == "ArgumentException" || data.body.StatusDescription == "DataException" || data.body.StatusDescription == "KeyNotFoundException"){
                    $scope.devo = "";
                    $scope.total = 0.0;
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: data.body.ResponseContent }
                }else{ 
                    modalContent = { status: data.statuscode, title: "Error", text: "Error Interno de servidor" }
                }

                $scope.loading = false;
                Modal.open(modalContent);
            }
        });
    }

    
    $scope.sendDevoToSeven = function(){

        $scope.loading2 = true;
        var modalContent = null;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", $scope.devo, "api/Devo/SendDevoToSeven", authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                $scope.loading2 = false;

                if(data.body.ResponseContent.RETORNO == 0){
                    var fac_nume = data.body.ResponseContent.FAC_NUME; //Consecutivo
                    var fac_cont = data.body.ResponseContent.FAC_CONT; //Numero
                    modalContent = { status: "success", title: data.body.StatusDescription, text: "Transacción realizada con éxito; Consecutivo transacción: "+fac_cont+" Numero documento: "+fac_nume }
                }else{
                    modalContent = { status: "danger", title: data.body.StatusDescription, text: data.body.ResponseContent.TXTERROR }
                }
                
                console.log(JSON.stringify(data.body.ResponseContent));
                Modal.openAlert(modalContent);
            }else{

                if(data.statuscode == 502){
                    modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor" }
                }else if(data.statuscode == 401){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: "El usuario actual no tiene privilegios para realizar esta acción." }
                }else if (data.body.StatusDescription == "ArgumentException" || data.body.StatusDescription == "TimeoutException" || data.body.StatusDescription == "ProtocolException" || data.body.StatusDescription == "OracleException"){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: data.body.ResponseContent }
                }else{ 
                    modalContent = { status: data.statuscode, title: "Error", text: "Error Interno de servidor" }
                }

                $scope.loading2 = false;
                Modal.open(modalContent);
            }
        });
    }
    

    $scope.isDisabled = function(value){
        if($scope.devo == "" || $scope.devo == null){
            $scope.setDisabled = true;
        }else{
            $scope.setDisabled = false;
        }
    }

    $scope.getFields = function(){
        if(SessionStorage.get('devo')){
            var poFactu = SessionStorage.get('devo');
            $scope.devo = poFactu;

            for (var i = 0; i < $scope.devo.vDetalleField.length; i++) {
                $scope.total += $scope.devo.vDetalleField[i].dfa_valoField;
            };
        }
    }

    //$scope.getFields();
    $scope.getParams();

    //$scope.$watch('filter', function() {
    //   if($scope.filter.value != 0)
    //        console.log($scope.filter.value);
    //});
});