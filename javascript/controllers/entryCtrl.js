challengeApp.controller('entryCtrl', function($scope, Services, SessionStorage, Modal) {
    
    var modalContent = null;
    $scope.currentuser = currentuser;
    $scope.entry = "";

    $scope.createEntry = function () {
        
        var form = $.param({title: $scope.title, content:$scope.content});
        
        var response = Services.post(form,'/entry/save_entry');
        response.then(function(data) {
            console.log(data);
            if(data.body.succes){
                modalContent = { status: "success", title: "Entry", text: data.body.message };
                Modal.openRedirect(modalContent,"/main");
            }else{
                modalContent = { status: "danger", title: "Entry", text: data.body.message };
                Modal.openAlert(modalContent);
            }     
        });
    };
    
    $scope.editEntry = function(){
        
        $scope.data = { id          : $scope.entry.id,
                        creationDate: $scope.entry.creationDate,
                        title       : $scope.title,
                        content     : $scope.content,
                        user_id     : $scope.entry.user_id,
        };
        
        var form = $.param($scope.data);
        
        var response = Services.post(form,'/entry/edit_entry');
        response.then(function(data) {
            console.log(data);
            if(data.body.succes){
                modalContent = { status: "success", title: "Entry", text: data.body.message };
                Modal.openRedirect(modalContent,"/main");
            }else{
                modalContent = { status: "danger", title: "Entry", text: data.body.message };
                Modal.openAlert(modalContent);
            }     
        });
    };
    
    $scope.getFields = function(){
        if(SessionStorage.get('entry')){
            var fields = SessionStorage.get('entry');
            $scope.entry = fields;
            $scope.title = fields.title;
            $scope.content = fields.content;
        }
    };

    $scope.getFields();
});