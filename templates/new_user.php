<!DOCTYPE html>
<html lang="en">
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

    <body>
        <div class="blog-masthead">
            <div class="container">
                <form class="navbar-form navbar-right" role="form">
                    <div class="form-group">
                      <input type="text" placeholder="Email" class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="password" placeholder="Password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>

        <div class="container">

            <div class="blog-header">
              <h1 class="blog-title">Register</h1>
            </div>

            <div class="row">
                <div class="col-sm-6 blog-main">
                    <div class="blog-post">
                        <form role="form">
                            <div class="form-group">
                              <label for="username">User name</label>
                              <input type="email" class="form-control" id="username" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                              <label for="email">Email address</label>
                              <input type="email" class="form-control" id="email" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                              <label for="password1">Password</label>
                              <input type="password" class="form-control" id="password1" placeholder="Password">
                            </div>
                            <div class="password2">
                              <label for="exampleInputPassword1">Repeat Password</label>
                              <input type="password" class="form-control" id="password2" placeholder="Password">
                            </div>
                            <div class="form-group">
                              <label for="about">About</label>
                              <textarea type="text" class="form-control" id="about" placeholder="Wait.. wath!?"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="twitter">Twitter Username</label>
                                <input type="text" class="form-control" id="twitter" placeholder="Username">
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div><!-- /.blog-main -->
            </div><!-- /.row -->
        </div><!-- /.container -->

        <div class="blog-footer">
            <p>Challenge <a href="">Blog Bootstrap</a></p>
            <p><a href="#">Back to top</a></p>
        </div>


        <!-- Bootstrap core JavaScript
        ================================================== -->
        <script src="javascript/vendor/jquery-1.10.2.js"></script>
        <script src="javascript/vendor/moment.js"></script>
        <script src="javascript/vendor/angular.js"></script>
        <script src="javascript/vendor/angular-locale_es-co.js"></script>
        <script src="javascript/vendor/loading-bar.js"></script>
        <script src="javascript/vendor/angular-route.js"></script>
        <script src="javascript/vendor/ui-bootstrap-tpls-0.10.0.js"></script>
        <script src="javascript/vendor/bootstrap-datepicker.js"></script>
        <script src="javascript/vendor/locales/bootstrap-datepicker.es.js"></script>
        <script src="javascript/vendor/spin.js"></script>
        <script src="javascript/vendor/ladda.js"></script>
        <!-- <script src="../scripts/javascript/app.js"></script>-->
    </body>
</html>
