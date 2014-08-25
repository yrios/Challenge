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
                <nav class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                      <li class="active"><a class="blog-nav-item" href="#">Home</a></li>
                      <li><a class="blog-nav-item" href="#">About</a></li>
                      <li><a class="blog-nav-item" >Contact</a></li>
                    </ul>
                    <form class="navbar-form navbar-right" role="form">
                        <div class="form-group">
                          <input type="text" placeholder="Email" class="form-control">
                        </div>
                        <div class="form-group">
                          <input type="password" placeholder="Password" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-primary">Sign in</button>
                        <a href="#" class="btn btn-primary">Register</a>
                    </form>
                </nav>
            </div>
        </div>

        <div class="container">

            <div class="blog-header">
              <h1 class="blog-title">Challenge Blog</h1>
              <p class="lead blog-description">The official example template of creating a blog with Bootstrap.</p>
            </div>

            <div class="row">

                <div class="col-sm-6 blog-main">

                    <div class="blog-post">
                        <h2 class="blog-post-title">Sample blog post</h2>
                        <p class="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>

                        <p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>
                        <hr>
                        <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                        <blockquote>
                          <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </blockquote>
                        <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                        <h2>Heading</h2>
                        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <h3>Sub-heading</h3>
                        <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        <pre><code>Example code block</code></pre>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>
                        <h3>Sub-heading</h3>
                        <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        <ul>
                          <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                          <li>Donec id elit non mi porta gravida at eget metus.</li>
                          <li>Nulla vitae elit libero, a pharetra augue.</li>
                        </ul>
                        <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
                        <ol>
                          <li>Vestibulum id ligula porta felis euismod semper.</li>
                          <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
                          <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
                        </ol>
                        <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>
                    </div><!-- /.blog-post -->

                    <div class="blog-post">
                        <h2 class="blog-post-title">Another blog post</h2>
                        <p class="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></p>

                        <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                        <blockquote>
                          <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </blockquote>
                        <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    </div><!-- /.blog-post -->

                    <div class="blog-post">
                      <h2 class="blog-post-title">New feature</h2>
                      <p class="blog-post-meta">December 14, 2013 by <a href="#">Chris</a></p>

                      <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                      <ul>
                        <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                        <li>Donec id elit non mi porta gravida at eget metus.</li>
                        <li>Nulla vitae elit libero, a pharetra augue.</li>
                      </ul>
                      <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                      <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
                    </div><!-- /.blog-post -->

                    <ul class="pager">
                      <li><a href="#">Previous</a></li>
                      <li><a href="#">Next</a></li>
                    </ul>
                </div><!-- /.blog-main -->

                <div class="col-sm-5 col-sm-offset-1 blog-sidebar">
                  <div class="sidebar-module sidebar-module-inset">
                    <h4>Tweets</h4>
                    <hr>
                    <div class="media">
                      <a class="pull-left" href="#">
                        <img class="media-object" src="http://pbs.twimg.com/profile_images/378800000511897260/cc276ac0415b03569c7f9c7b48527db2_normal.jpeg" alt="">
                      </a>
                      <div class="media-body">
                        <h4 class="media-heading">Media heading</h4>
                        Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                      </div>
                    </div>
                    <hr>
                    <div class="media">
                      <a class="pull-left" href="#">
                        <img class="media-object" src="http://pbs.twimg.com/profile_images/378800000511897260/cc276ac0415b03569c7f9c7b48527db2_normal.jpeg" alt="">
                      </a>
                      <div class="media-body">
                        <h4 class="media-heading">Media heading</h4>
                        Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                      </div>
                    </div>
                    <hr>
                    <div class="media">
                      <a class="pull-left" href="#">
                        <img class="media-object" src="http://pbs.twimg.com/profile_images/378800000511897260/cc276ac0415b03569c7f9c7b48527db2_normal.jpeg" alt="">
                      </a>
                      <div class="media-body">
                        <h4 class="media-heading">Media heading</h4>
                        Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                      </div>
                    </div>
                    <hr>
                  </div>
                </div><!-- /.blog-sidebar -->
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
