saysSevenApp.controller('consdCtrl', function($scope, $location, $interval, Services, UserSession, Modal, SessionStorage, LogInfo, Pagination) {
    
    $scope.format = 'MM/dd/yyyy';
    $scope.setDisabled = true;
    $scope.currentuser = UserSession.readCookie("username");
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];
    $scope.progress = 0.0;
    var stop;

    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.aportes = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        console.log(page);
        $scope.aportes = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }

    if(SessionStorage.get('consigd')) {
        $scope.bigtotal = SessionStorage.get('consigd');
        $scope.setPage();
    }else{
        //$scope.logs = null;
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

    $scope.getByDate = function(){
        //$scope.setProgress();
        $scope.loading = true;
        var modalContent = null;
        
        var initdate = moment($scope.dt).format('DD/MM/YYYY');
        var enddate = moment($scope.dt2).format('DD/MM/YYYY');

        SessionStorage.save("consigdDates", {initdate: $scope.dt, enddate: $scope.dt2});
        SessionStorage.save("logDates", {initdate: $scope.dt, enddate: $scope.dt2});

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/consd/Get?initdate="+initdate+"&enddate="+enddate, authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                $scope.loading = false;
                $scope.bigtotal = data.body.ResponseContent;
                $scope.setPage();

                if($scope.progress > 0.0){
                    $scope.setDisabled = true;
                }else{
                    $scope.setDisabled = false;
                }
                

                SessionStorage.save("consigd", $scope.bigtotal);
                //Modal.open($scope.modalContent);
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

    $scope.sendToSeven = function(event){
        event.preventDefault();
        $scope.loading2 = true;
        $scope.startProgress();
        $scope.setDisabled = true;
        var modalContent = null;
        
        initdate = moment($scope.dt).format('DD/MM/YYYY');
        enddate = moment($scope.dt2).format('DD/MM/YYYY');

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", "", "api/consd/SendConsd?initdate="+initdate+"&enddate="+enddate, authToken);

        response.then(function(data) {
            //console.log(data);
            //$scope.stopProgress();
            if(data.body.StatusDescription == "success"){
                $scope.loading2 = false;
                $scope.setDisabled = false;
                LogInfo.logs = data.body.ResponseContent;
            }else{
                if(data.statuscode == 502){
                    modalContent = { status: data.statuscode, title: "Error", text: "No se puede establecer conexión con el servidor, por favor intente mas tarde" }
                    $interval.cancel(stop);
                    stop = null;
                    $scope.progress = 0.0;
                    $scope.loading2 = false;
                    Modal.open(modalContent);
                }else if(data.statuscode == 401){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: "El usuario actual no tiene privilegios para realizar esta acción." }
                    $interval.cancel(stop);
                    stop = null;
                    $scope.progress = 0.0;
                    $scope.loading2 = false;
                    Modal.open(modalContent);
                }else if (data.body.StatusDescription == "ArgumentException" || data.body.StatusDescription == "DataException" || data.body.StatusDescription == "ApplicationException" || data.body.StatusDescription == "ProtocolException"){
                    modalContent = { status: data.statuscode, title: data.body.StatusDescription, text: data.body.ResponseContent }
                    $interval.cancel(stop);
                    stop = null;
                    $scope.progress = 0.0;
                    $scope.loading2 = false;
                    Modal.open(modalContent);
                }else if(data.statuscode == 404){ 
                    //modalContent = { status: data.statuscode, title: "Error", text: "Error Interno de servidor" }
                    //Modal.open(modalContent);
                    //alert(JSON.stringify(data));
                }
                //$scope.stopProgress();
                //$scope.loading2 = false;
            }  
        });
    }

    $scope.isDisabled = function(value){
        if($scope.aportes == null || $scope.aportes.length == 0){
            $scope.setDisabled = true;
        }else{
            $scope.setDisabled = false;
        }
    }

    
    $scope.startProgress = function(){

        stop = $interval(function () {
            var response = Services.CheckProgress('consd')
            response.then(function(data) {
                $scope.progress = data;
                //console.log($scope.progress);
                if($scope.progress == 100.0){
                    $scope.stopProgress();
                    $location.path("/main/log/consigd");
                }
            });
        }, 2000);
    };

    $scope.stopProgress = function(){
        $interval.cancel(stop);
        stop = null;
        $scope.progress = 0.0;
        var authToken = UserSession.readCookie("authToken");
        Services.ResetProgress('consd',authToken)
    }

    $scope.getProgress = function(){
        var response = Services.CheckProgress('consd')
        response.then(function(data) {
            $scope.progress = data;

            if($scope.progress > 0.0 && $scope.progress < 100.0){
                $scope.startProgress();
                $scope.getDates();
            }else{
                $scope.getDates();
            }
        });
    }

    $scope.getDates = function(){
        if(SessionStorage.get('consigdDates')){
            dates = SessionStorage.get('consigdDates');
            $scope.dt = dates.initdate;
            $scope.dt2 = dates.enddate;
            $scope.getByDate();
        }else{
            $scope.dt = new Date();
            $scope.dt2 = new Date();
        }
    }

     $scope.getProgress();

});

saysSevenApp.controller('detalleConsdCtrl', function($scope, $location, $interval, Services, UserSession, Modal, SessionStorage, Pagination) {
    
    $scope.currentuser = UserSession.readCookie("username");
    $scope.comprobante = "";
    $scope.identity = "";
    $scope.setDisabled = true;
    $scope.cicle = "";
    $scope.consd = [];
    $scope.options = [{text: "--Seleccione--", value: '0'}];

    $scope.getParams = function(){
        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/parameter/Get?tipo="+operations["CONSD"], authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                SessionStorage.save("param", data.body.ResponseContent);
                $scope.params = data.body.ResponseContent;

                for (var i = 0; i < $scope.params.length; i++) {
                    $scope.options.push({text: $scope.params[i].Descripcion, value: $scope.params[i].Id});
                }
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

    $scope.getConsd = function(zone){

        $scope.loading = true;
        var modalContent = null;

        var id = $scope.identity;
        var cicle = $scope.cicle;
        var comprobante = $scope.comprobante;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("GET", "", "api/consd/GetSingle?id="+id+"&cicle="+cicle+"&comprobante="+comprobante+"&zone="+zone, authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                
                $scope.setDisabled = false;
                SessionStorage.save("consd", data.body.ResponseContent);
                $scope.consd = data.body.ResponseContent;
                $scope.details = $scope.consd[0].vDetalleField;
                $scope.distribution = $scope.details[0].vDistribAField;

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

    $scope.sendConsdToSeven = function(){

        $scope.loading2 = true;
        var modalContent = null;

        var id = $scope.identity;
        var cicle = $scope.cicle;
        var comprobante = $scope.comprobante;
        var zone = $scope.filter.value;

        var authToken = UserSession.readCookie("authToken");
            
        var response = Services.SendAjaxRequest("POST", "", "api/consd/SendSingle?id="+id+"&cicle="+cicle+"&comprobante="+comprobante+"&zone="+zone, authToken);
        response.then(function(data) {
            if(data.body.StatusDescription == "success"){
                $scope.loading2 = false;

                if(data.body.ResponseContent.RETORNO == 0){
                    var mte_nume = data.body.ResponseContent.MTE_NUME; //Consecutivo
                    var mte_cont = data.body.ResponseContent.MTE_CONT; //Numero
                    modalContent = { status: "success", title: data.body.StatusDescription, text: "Transacción realizada con éxito; Consecutivo transacción: "+mte_cont+" Numero documento: "+mte_nume }
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

    $scope.isDisabled = function(value){
        if($scope.consd.length == 0){
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
        $scope.getConsd($scope.filter.value);
    });
});

saysSevenApp.controller('resultCtrl', function($scope, UserSession, LogInfo, Modal, SessionStorage, Pagination) {

    $scope.currentuser = UserSession.readCookie("username");
    $scope.valortotal = 0;
    $scope.numPerPage = 20;
    $scope.currentPage = 1;
    $scope.bigtotal = [];

    $scope.calculateTotal = function(data){
        $scope.valortotal = 0;
        for (var i = 0; i < data.length; i++) {
            if(data[i].Estado == "C"){
                $scope.valortotal += data[i].ValorTransaccion;
            }
        };
    }

    $scope.setPage = function(){
        if($scope.bigtotal){
            $scope.logs = Pagination.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
        }
    }

    $scope.changed = function(page) {
        console.log(page);
        $scope.logs = Pagination.get( (page - 1) * $scope.numPerPage, $scope.numPerPage, $scope.bigtotal );
    }
    
    $scope.bigtotal = LogInfo.logs;
    $scope.setPage();
});