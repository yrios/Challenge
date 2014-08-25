saysSevenApp.controller('logCtrl', function($scope, $location, Services, UserSession, Modal, SessionStorage, Pagination) {

    $scope.format = 'MM/dd/yyyy';
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.valortotal = 0;
    $scope.init = [];
    $scope.options = [{text: "Contabilizado", value: 'C'},
                      {text: "Error", value: 'E'},
                      {text: "Duplicadas", value: 'D'}];

    $scope.selectTipos = function(){
        /*
        operations.then(function(data) {
            $scope.optionsOptions = [];
            for(p in data){
                //console.log(p+"::"+data[p]);
                $scope.optionsOptions.push({text: p, value: data[p]});
            }
            $scope.init = $scope.optionsOptions[0];
        })
        */
        var authToken = UserSession.readCookie("authToken");
        var response = Services.SendAjaxRequest("GET", "", "api/parameter/GetOperations", authToken);
        
        response.then(function(data) {
            $scope.optionsOptions = [];
            if(data.body.StatusDescription == "success"){
                var operaciones = data.body.ResponseContent;
                for (var i = 0; i < operaciones.length; i++) {
                    //console.log(operaciones[i]);
                    $scope.optionsOptions.push({text: operaciones[i].NombreOperacion, value: operaciones[i]});
                };
                $scope.init = $scope.optionsOptions[0];

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

    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.logs = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        $scope.logs = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    $scope.calculateTotal = function(data){
        $scope.valortotal = 0;
        for (var i = 0; i < data.length; i++) {
            if(data[i].Estado == "C"){
                $scope.valortotal += data[i].ValorTransaccion;
            }
        };
    }
    
    if(SessionStorage.get('logs')) {
        $scope.bigtotal = SessionStorage.get('logs');
        $scope.calculateTotal($scope.bigtotal);
        $scope.setPage();
    }else{
        //console.log("no hay nada");
    }

    $scope.open = function($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();

        if(opened == "date1"){
            $scope.date1 = true;
        }else{
            $scope.date2 = true;
        }
    };

    $scope.getLogsByDate = function(){
        $scope.loading = true;
        var modalContent = null;
        
        var initdate = moment($scope.dt).format('DD/MM/YYYY');
        var enddate = moment($scope.dt2).format('DD/MM/YYYY');
        var estado = $scope.filter;

        //SessionStorage.save("consigdDates", {initdate: $scope.dt, enddate: $scope.dt2});
        SessionStorage.save("logDates", {initdate: $scope.dt, enddate: $scope.dt2});

        var authToken = UserSession.readCookie("authToken");
        var response;
        
        if(!$scope.value){
            response = Services.SendAjaxRequest("GET", "", "api/log/Get?initdate="+initdate+"&enddate="+enddate+"&operacion="+$scope.init.value.CodigoOperacion, authToken);
        }else{
            response = Services.SendAjaxRequest("GET", "", "api/log/GetFiltered?initdate="+initdate+"&enddate="+enddate+"&state="+$scope.filter.value+"&operacion="+$scope.init.value.CodigoOperacion, authToken);
        }
        
        
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                $scope.bigtotal = data.body.ResponseContent;
                $scope.calculateTotal($scope.bigtotal);
                $scope.setPage();
                SessionStorage.save('logs', $scope.bigtotal);
                $scope.loading = false;
                
            }else{
                if(data.statuscode == 502){
                    modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor, por favor intente mas tarde" }
                }else if(data.statuscode == 401){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: "El usuario actual no tiene privilegios para realizar esta acción." }
                }else{
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: data.body.ResponseContent }
                }
                
                $scope.loading = false;
                Modal.open(modalContent);
            }  
        });
        
    }

    $scope.getOperation = function(){
        var initdate = moment($scope.dt).format('DD/MM/YYYY');
        var enddate = moment($scope.dt2).format('DD/MM/YYYY');
        var estado = $scope.filter;

        SessionStorage.save("consigdDates", {initdate: $scope.dt, enddate: $scope.dt2});
        SessionStorage.save("logDates", {initdate: $scope.dt, enddate: $scope.dt2});

        var authToken = UserSession.readCookie("authToken");
        var response;
        var codeOperations;

        codeOperations = Services.SendAjaxRequest("GET", "", "api/parameter/GetOperations", authToken);
        codeOperations.then(function(data) {
            /*
            $scope.optionsOptions = [];
            for(p in data){
                console.log(p+"::"+data[p]);
                 $scope.optionsOptions.push({text: p, value: data[p]});
            }
            $scope.init = $scope.optionsOptions[0];
            */
            $scope.optionsOptions = [];
            var operaciones = data.body.ResponseContent;
            
            for (var i = 0; i < operaciones.length; i++) {
                console.log(operaciones[i]);
                $scope.optionsOptions.push({text: operaciones[i].NombreOperacion, value: operaciones[i]});
            };
            $scope.init = $scope.optionsOptions[0];

            if(!$scope.value){
                response = Services.SendAjaxRequest("GET", "", "api/log/Get?initdate="+initdate+"&enddate="+enddate+"&operacion="+$scope.init.value.CodigoOperacion, authToken);
            }else{
                response = Services.SendAjaxRequest("GET", "", "api/log/GetFiltered?initdate="+initdate+"&enddate="+enddate+"&state="+$scope.filter.value+"&operacion="+$scope.init.value.CodigoOperacion, authToken);
            }

            response.then(function(data) {
                if(data.body.StatusDescription == "success"){
                    $scope.bigtotal = data.body.ResponseContent;
                    $scope.calculateTotal($scope.bigtotal);
                    $scope.setPage();
                    SessionStorage.save('logs', $scope.bigtotal);
                    $scope.loading = false;
                    
                }else{
                    if(data.statuscode == 502){
                        modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor, por favor intente mas tarde" }
                    }else if(data.statuscode == 401){
                        modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: "El usuario actual no tiene privilegios para realizar esta acción." }
                    }else{
                        modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: data.body.ResponseContent }
                    }
                    
                    $scope.loading = false;
                    Modal.open(modalContent);
                }  
            });
        })
    }

    $scope.exportToExcel = function(){

        initdate = moment($scope.dt).format('DD/MM/YYYY');
        enddate = moment($scope.dt2).format('DD/MM/YYYY');

        var authToken = UserSession.readCookie("authToken");
        response = Services.GetFile("GET", "api/log/GenerateExcel?initdate="+initdate+"&enddate="+enddate+"&state="+$scope.filter.value+"&operacion="+$scope.init.value.CodigoOperacion, authToken);
    }

    if(SessionStorage.get('logDates')){
        dates = SessionStorage.get('logDates');
        $scope.dt = dates.initdate;
        $scope.dt2 = dates.enddate;
        $scope.getOperation();
    }else{
        $scope.dt = new Date();
        $scope.dt2 = new Date();
        $scope.selectTipos();
    }
});

saysSevenApp.controller('logTerCtrl', function($scope, UserSession, TerLogInfo, Modal, SessionStorage, Pagination, Services) {

    $scope.currentuser = UserSession.readCookie("username");
    $scope.format = 'MM/dd/yyyy';
    $scope.dt = new Date();
    $scope.dt2 = new Date();
    $scope.valortotal = 0;
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.options = [{text: "Creado", value: 'creado'},
                      {text: "Error", value: 'E'}];

    $scope.open = function($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();
        //console.log(opened);
        if(opened == "date1"){
            $scope.date1 = true;
        }else{
            $scope.date2 = true;
        }
    };


    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.logs = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        console.log(page);
        $scope.logs = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    $scope.getLogsByDate = function(state){
        $scope.loading = true;
        var modalContent = null;

        var initdate = moment($scope.dt).format('DD/MM/YYYY');
        var enddate = moment($scope.dt2).format('DD/MM/YYYY');

        var authToken = UserSession.readCookie("authToken");
        var response = Services.SendAjaxRequest("GET", "", "api/thirdlog/GetFiltered?initdate="+initdate+"&enddate="+enddate+"&state="+state, authToken);
        
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

    $scope.$watch('filter', function() {
        $scope.getLogsByDate($scope.filter.value);
    });
});