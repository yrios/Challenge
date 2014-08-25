challengeApp.factory('Modal', function($modal,$location) {
    return{

        open: function (content) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        return content;
                    }
                },
                windowClass: 'bs-example-modal-sm'
            });

            //Se ejecuta cuando el usuario cierra el Modla Windows esto es una promesa
            modalInstance.result.then(function (content) {}, function () {
                //console.log(content.status);
                //$location.path("/principal");
            });
        },

        openRedirect: function (content, redirectUrl) {
            var modalInstance = $modal.open({
                templateUrl: 'myAlertModal.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        return content;
                    }
                },
            });

            //Se ejecuta cuando el usuario cierra el Modla Windows esto es una promesa
            modalInstance.result.then(function (content) {}, function () {
                //console.log(content.status);
                //if(content.status == "success")
                $location.path(redirectUrl);
                //$location.path("/main/mcont");
            });
        },

        openAlert: function (content, redirectUrl) {
            var modalInstance = $modal.open({
                templateUrl: 'myAlertModal.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        return content;
                    }
                },
            });
        }
    };
});

challengeApp.factory('SessionStorage', [function() {

    return {
        save: function(key,data){
            try{
                sessionStorage.setItem(key, JSON.stringify(data));
            }catch(e){
                //Objeto es demasiado Grande para ser almacenado
            }
        },
        get: function(key){
            var storage = window['sessionStorage'];
            var data = JSON.parse(storage.getItem(key));
            return data;
        }
    }
}]);

challengeApp.factory('UserSession', [function() {
    
    return {
        isLogged: function(){
            var auth = currentuser;
            
            if(auth == null){
                return false;
            }else{
                return true;
            }
        }
    };
}]);

challengeApp.factory('Services', function($http,$q) {
    return {
        SendAjaxRequest: function(type, data, urlPartial){
            
            var deferred = $q.defer();
            var init_url = base_url;
            var response = null;

            $http({method: type, url: init_url + urlPartial, data: data}).
            success(function(data, status, headers, config) {
              //console.log(status);
              // Este callback se ejecutara de manera asincrona.
              response = {statuscode: status, body: data}
              deferred.resolve(response);
            }).
            error(function(data, status, headers, config) {
              //console.log(status);
              // Este Callback de error se ejecutara de manera asincrona.
              response = {statuscode: status, body: data}
              deferred.resolve(response);
            });
            return deferred.promise;
        },
        post: function(form, urlPartial){
            var deferred = $q.defer();
            var init_url = base_url;
            var response = null;
            
            $http({method: 'POST', url: init_url + urlPartial, data: form, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
            success(function(data, status, headers, config) {
                //console.log(status);
                // Este Callback de error se ejecutara de manera asincrona.
                response = {statuscode: status, body: data}
                deferred.resolve(response);
            }).
            error(function(data, status, headers, config) {
                //console.log(status);
                // Este Callback de error se ejecutara de manera asincrona.
                response = {statuscode: status, body: data}
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    };
});

challengeApp.factory( 'Pagination', function() {
  return {
    get: function(offset, limit, data) {
      return data.slice( offset, offset+limit );
    },
    count: function(data) {
      return data.length;
    }
  };
});