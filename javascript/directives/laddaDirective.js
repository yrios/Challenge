//la siguiente directiva permite controlar el spinner de los botones en el app
saysSevenApp.directive('ladda', function(){
  return {
      restrict: 'A',
      link : function(scope, element, attrs){
          var l = Ladda.create( document.querySelector('#'+attrs.id));
          scope.$watch(attrs.ladda, function(newVal, oldVal){
              if (newVal !== undefined){
                  if(newVal) {
                      l.start();
                  }
                  else {
                      l.stop();
                  }
              }
          });
      }
  };
});