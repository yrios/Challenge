saysSevenApp.controller('paramCtrl', function($scope, $location, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];

    operations.then(function(data) {
        $scope.optionsOptions = [];
        console.log(data);
        for (p in data) {
            if(p != "DEVO" && p != "CONSD")
                $scope.optionsOptions.push({text: p, value: data[p]});
        }
        $scope.init = $scope.optionsOptions[0];
    })    

    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.paremeters = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        console.log(page);
        $scope.paremeters = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    $scope.getParams = function(){

        $scope.loading = true;
        var modalContent = null;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/parameter/Get?tipo="+$scope.init.value, authToken);
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

    $scope.selectItem = function(param){
        $scope.mySelection = param;
        SessionStorage.save("parameterSet", param);
        $location.path("/main/param/update"); 
    }

});

saysSevenApp.controller('paramUpdateCtrl', function($scope, $location, $interval, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.cuentaCredito = [];
    $scope.cuentaDebito = [];
    $scope.param = "";
    
    $scope.updateParams = function(){

        $scope.loading2 = true;
        var modalContent = null;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", $scope.param, "api/parameter/UpdateParam", authToken);
        response.then(function(data) {

            if(data.body.StatusDescription == "success"){
                $scope.loading2 = false;
                SessionStorage.save('parameterSet',$scope.param)
                modalContent = {status: data.statuscode, title: data.body.StatusDescription, text: "Cambios guardados exitosamente" };
                Modal.open(modalContent);
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

                $scope.loading2 = false;
                Modal.open(modalContent);
            }
        });
    }

    $scope.getCuentas = function(){
        
        var modalContent = null;
        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", $scope.param, "api/parameter/GetCuentas", authToken);
        response.then(function(data) {

            if(data.body.StatusDescription == "success"){

                var cuentas = data.body.ResponseContent;

                for (var i = 0; i < cuentas.length; i++) {
                    $scope.cuentaCredito.push({text: cuentas[i].CodigoCuenta, value: cuentas[i].CodigoCuenta});
                    $scope.cuentaDebito.push({text: cuentas[i].CodigoCuenta, value: cuentas[i].CodigoCuenta});
                };
                
                for (var i = 0; i < $scope.cuentaDebito.length; i++) {
                    if($scope.param.CodigoCuentaDebito == cuentas[i].CodigoCuenta)
                        $scope.debito = $scope.cuentaDebito[i];
                };
                    
                for (var i = 0; i <  $scope.cuentaCredito.length; i++) {
                    if($scope.param.CodigoCuentaCredito == cuentas[i].CodigoCuenta)
                        $scope.credito = $scope.cuentaCredito[i]; 
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

                $scope.loading2 = false;
                Modal.open(modalContent);
            }
        });
    }

    $scope.getFields = function(){
        if(SessionStorage.get('parameterSet')){
            var parameter = SessionStorage.get('parameterSet');
            $scope.param = parameter;
        }
    }

    $scope.getFields();
    $scope.getCuentas();

    $scope.$watch('debito', function() {
        if($scope.debito)
            $scope.param.CodigoCuentaDebito = $scope.debito.value;
    });

    $scope.$watch('credito', function() {
        if($scope.credito)
            $scope.param.CodigoCuentaCredito = $scope.credito.value;
    });
});

saysSevenApp.controller('paramCreateCtrl', function($scope, $location, $interval, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.tipos = [];
    $scope.cuentaCredito = [];
    $scope.cuentaDebito = [];

    $scope.param = {Id: "",
                    TipoOperacion: {Id:"",CodigoOperacion:"",NombreOperacion:"",DescripcionOperacio:""},
                    CodigoCuentaDebito: "",
                    CodigoCuentaCredito: ""};

    operations.then(function(data) {
        $scope.optionsOptions = [];
        for (p in data) {
            if(p != "DEVO")
                $scope.optionsOptions.push({text: p, value: data[p]});
        }
        $scope.init = $scope.optionsOptions[0];
    })    
    
    $scope.saveParams = function(){

        $scope.loading2 = true;
        var modalContent = null;
        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", $scope.param, "api/parameter/SaveParam", authToken);
        response.then(function(data) {

            if(data.body.StatusDescription == "success"){
                $scope.loading2 = false;
                modalContent = {status: data.statuscode, title: data.body.StatusDescription, text: "parametros guardados exitosamente" };
                Modal.open(modalContent);
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

                $scope.loading2 = false;
                Modal.open(modalContent);
            }
        });
    }

    $scope.getCuentas = function(){
        
        var modalContent = null;
        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", $scope.param, "api/parameter/GetCuentas", authToken);
        response.then(function(data) {

            if(data.body.StatusDescription == "success"){

                var cuentas = data.body.ResponseContent;

                for (var i = 0; i < cuentas.length; i++) {
                    $scope.cuentaCredito.push({text: cuentas[i].CodigoCuenta, value: cuentas[i].CodigoCuenta});
                    $scope.cuentaDebito.push({text: cuentas[i].CodigoCuenta, value: cuentas[i].CodigoCuenta});
                };

                $scope.debito = $scope.cuentaDebito[0];
                $scope.credito = $scope.cuentaCredito[0];

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

                $scope.loading2 = false;
                Modal.open(modalContent);
            }
        });
    }

    $scope.getTipoAporte = function (){
        var modalContent = null;
        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", $scope.param, "api/parameter/GetTipoAporte", authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                for(p in data.body.ResponseContent){
                    $scope.tipos.push({text: data.body.ResponseContent[p], value: p});
                }
                $scope.tipo = $scope.tipos[0];
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

                $scope.loading2 = false;
                Modal.open(modalContent);
            }
        });
    }

    $scope.getCuentas();
    $scope.getTipoAporte();

    $scope.$watch('init', function() {
        if($scope.init){
            $scope.param.TipoOperacion.Id = $scope.init.value;
            $scope.param.TipoOperacion.NombreOperacion = $scope.init.text;
        }
    });

    $scope.$watch('tipo', function() {
        if($scope.tipo)
            $scope.param.TipoAporte = $scope.tipo.value;
    });

    $scope.$watch('debito', function() {
        if($scope.debito)
            $scope.param.CodigoCuentaDebito = $scope.debito.value;
    });

    $scope.$watch('credito', function() {
        if($scope.credito)
            $scope.param.CodigoCuentaCredito = $scope.credito.value;
    });
});

saysSevenApp.controller('paramTipoCtrl', function($scope, $location, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];

    operations.then(function(data) {
        $scope.optionsOptions = [];
        for(p in data){
             $scope.optionsOptions.push({text: p, value: data[p]});
        }
        $scope.init = $scope.optionsOptions[0];
    })    

    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.tipoOperacion = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        console.log(page);
        $scope.tipoOperacion = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    $scope.getParams = function(){

        $scope.loading = true;
        var modalContent = null;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/parameter/GetOperations", authToken);
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

    $scope.selectItem = function(operacion){
        $scope.mySelection = operacion;
        SessionStorage.save("operacion", operacion);

        $location.path("/main/param/tipos/update");
    }

    $scope.getParams();
});

saysSevenApp.controller('paramTiposUpdateCtrl', function($scope, $location, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.operacion = "";

    $scope.UpdateParam = function(){

        $scope.loading = true;
        var modalContent = null;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", $scope.operacion, "api/parameter/UpdateTipoOperacion", authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                $scope.loading = false;
                SessionStorage.save('operacion',$scope.operacion)
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
        if(SessionStorage.get('operacion')){
            var parameter = SessionStorage.get('operacion');
            $scope.operacion = parameter;
        }
    }

    $scope.getFields();
});