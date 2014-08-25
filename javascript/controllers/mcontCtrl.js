saysSevenApp.controller('mcontCtrl', function($scope, $location, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.comprobante = "";
    $scope.identity = "";
    $scope.cicle = "";
    $scope.acreeos = [];

    $('.input-group.date').datepicker({
        format: "yyyy/mm",
        minViewMode: 1,
        language: "es",
        autoclose: true,
        multidate: false
    });

    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.acreeos = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        console.log(page);
        $scope.acreeos = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    $scope.getAcree = function(){

        $scope.loading = true;
        var modalContent = null;

        var id = $scope.identity;
        var cicle = $scope.cicle;
        var comprobante = $scope.comprobante;

        SessionStorage.save("fields", {id:$scope.identity, cicle:$scope.cicle, comprobante:$scope.comprobante});

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/acreedor/Get?id="+id+"&cicle="+cicle+"&comprobante="+comprobante, authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                $scope.loading = false;

                SessionStorage.save("acreeos", data.body.ResponseContent);
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

    $scope.removeLeadingZeros = function (value){
       return value.replace(/^0+/, '');
    }

    $scope.selectItem = function(acreedor){
        $scope.mySelection = acreedor;
        SessionStorage.save("acreedor", acreedor);

        var actual = moment(new Date());
        var fechaPago = moment($scope.mySelection.FechaPago);
        //var fechaPagoAdd = moment($scope.mySelection.FechaPago).add(2,'months');
        
        //console.log(actual.isSame(fechaPago,'months'));
        //console.log(actual.diff(fechaPagoAdd, 'months'));

        if(actual.isSame(fechaPago,'months')){
            $location.path("/main/consigd/detalle");
        }else{
            $location.path("/main/mcont/detalle");
        }
    }

    $scope.getFields = function(){
        if(SessionStorage.get('fields')){
            var fields = SessionStorage.get('fields');
            $scope.identity = fields.id;
            $scope.cicle = fields.cicle;
            $scope.comprobante = fields.comprobante;
            $scope.getAcree();
        }

        if(SessionStorage.get('acreeos')){
            var acreeos = SessionStorage.get('acreeos');
            $scope.bigtotal = acreeos;
            $scope.setPage();
        }
    }

    $scope.getFields();
});

saysSevenApp.controller('detalleMcontCtrl', function($scope, $location, $interval, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.format = 'MM/dd/yyyy';
    $scope.comprobante = "";
    $scope.identity = "";
    $scope.setDisabled = true;
    $scope.cicle = "";
    $scope.mcont = [];
    $scope.options = [{text: "--Seleccione--", value: '0'}];

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
            var response = Services.SendAjaxRequest("GET", "", "api/parameter/Get?tipo="+opr["MCONT"], authToken);
            response.then(function(data) {
                if(data.body.StatusDescription == "success"){
                    
                    SessionStorage.save("param", data.body.ResponseContent);
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

    $scope.getMcont = function(zone){

        $scope.loading = true;
        var modalContent = null;

        var id = $scope.identity;
        var cicle = $scope.cicle;
        var comprobante = $scope.comprobante;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/mcontable/Get?id="+id+"&cicle="+cicle+"&comprobante="+comprobante+"&zone="+zone, authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                $scope.setDisabled = false;
                SessionStorage.save("mcont", data.body.ResponseContent);
                $scope.mcont = data.body.ResponseContent;
                $scope.details = $scope.mcont[0].vDetalleField;

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
    }

    $scope.sendMcontToSeven = function(){

        $scope.loading2 = true;
        var modalContent = null;

        var id = $scope.identity;
        var cicle = $scope.cicle;
        var date = moment($scope.mcont[0].mco_fechField).format('DD/MM/YYYY');
        var comprobante = $scope.comprobante;
        var zone = $scope.filter.value;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", "", "api/mcontable/sendmcont?id="+id+"&cicle="+cicle+"&date="+date+"&comprobante="+comprobante+"&zone="+zone, authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                $scope.loading2 = false;

                if(data.body.ResponseContent.RETORNO == 0){
                    var mco_nume = data.body.ResponseContent.MCO_NUME; //Consecutivo
                    var mco_cont = data.body.ResponseContent.MCO_CONT; //Numero
                    modalContent = { status: "success", title: data.body.StatusDescription, text: "Transacción realizada con éxito; Consecutivo transacción: "+mco_cont+" Numero documento: "+mco_nume }
                }else{
                    modalContent = { status: "danger", title: data.body.StatusDescription, text: data.body.ResponseContent.TXTERROR }
                }
                
                console.log(JSON.stringify(data.body.ResponseContent));
                Modal.openRedirect(modalContent, "/main/mcont");
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
        if($scope.mcont.length == 0){
            $scope.setDisabled = true;
        }else{
            $scope.setDisabled = false;
        }
    }

    $scope.getFields = function(){
        if(SessionStorage.get('acreedor')){
            var acreedor = SessionStorage.get('acreedor');
            $scope.comprobante = acreedor.Comprobante;
            $scope.identity = acreedor.Identificacion.replace(/^0+/, '');
            $scope.cicle = acreedor.Anio+"/"+acreedor.Mes;
        }else{
            $location.path("/main/mcont");
        }
    }

    $scope.getFields();
    $scope.getParams();

    $scope.$watch('filter', function() {
        if($scope.filter.value != 0)
        $scope.getMcont($scope.filter.value);
    });
});