<!DOCTYPE html>
<html lang="en" ng-app="challengeApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../../favicon.ico">

        <title>My Blog</title>

        <!-- Bootstrap core CSS -->

        <link href="content/stylesheet/bootstrap.css" rel="stylesheet">
        <link href="content/stylesheet/ladda-themeless.css" rel="stylesheet">
        <link href="content/stylesheet/loading-bar.css" rel="stylesheet">

        <!-- Custom styles for this site -->
        <link href="content/stylesheet/blog.css" rel="stylesheet">
        <!-- <link href="../content/stylesheet/application.css" rel="stylesheet">-->
    </head>
    <body ng-controller="mainCtrl">
        <div ng-view></div>
        <!-- Bootstrap core JavaScript
        ================================================== -->
        <script>
            <?php
                $currentuser = array('username'=>'','twitterAcount'=>'');
                if($this->ion_auth->logged_in())
                {                   
                    $user = $this->ion_auth->user()->row();
                    $currentuser = array('username'=>$user->username,
                        'twitterAcount'=>$user->twitterAccount);
                }
                else
                {
                    $currentuser = null;
                }
            ?>
                
            var currentuser = JSON.parse('<?php echo json_encode($currentuser);?>');
            var base_url = "<?php echo site_url();?>"
        </script>
        <script src="javascript/vendor/jquery-1.10.2.js"></script>
        <script src="javascript/vendor/moment.js"></script>
        <script src="javascript/vendor/angular.js"></script>
        <script src="javascript/vendor/angular-locale_en-na.js"></script>
        <script src="javascript/vendor/loading-bar.js"></script>
        <script src="javascript/vendor/angular-route.js"></script>
        <script src="javascript/vendor/ui-bootstrap-tpls-0.10.0.js"></script>
        <script src="javascript/vendor/bootstrap-datepicker.js"></script>
        <script src="javascript/vendor/locales/bootstrap-datepicker.es.js"></script>
        <script src="javascript/vendor/spin.js"></script>
        <script src="javascript/vendor/ladda.js"></script>
        <script src="javascript/app.js"></script>
        <script src="javascript/services/factories.js"></script>
        <script src="javascript/controllers/mainCtrl.js"></script>
        <script src="javascript/controllers/blogCtrl.js"></script>
        <script src="javascript/controllers/entryCtrl.js"></script>
    </body>
</html>
