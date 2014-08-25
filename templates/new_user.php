<!-- Angular Alert Template -->
<script type="text/ng-template" id="myAlertModal.html">
  <div class="modal-body">
       <alert type="items.status" >{{items.text}}</alert>
  </div>
</script>
<!-- Angular Alert Template -->
<div class="blog-masthead">
    <div class="container">
        <nav class="collapse navbar-collapse">
            <form class="navbar-form navbar-right" ng-submit="login(user.username,user.password)" role="form">
                <div class="form-group">
                    <input type="text" placeholder="username" ng-model="user.username" class="form-control">
                </div>
                <div class="form-group">
                  <input type="password" placeholder="Password" ng-model="user.password" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Sign in</button>
                <a href="#/register" class="btn btn-primary">Register</a>
            </form>
        </nav>
    </div>
</div>
<div class="container">

    <div class="blog-header">
      <h1 class="blog-title">Register</h1>
    </div>

    <div class="row">
        <div class="col-sm-6 blog-main">
            <div class="blog-post">
                <form ng-submit="createUser()" role="form">
                    <div class="form-group">
                      <label for="username">User name</label>
                      <input type="text" class="form-control" id="username" ng-model="username" placeholder="Enter username">
                    </div>
                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input type="email" class="form-control" id="email" ng-model="email" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                      <label for="password1">Password</label>
                      <input type="password" class="form-control" id="password1" ng-model="password" placeholder="Password">
                    </div>
                    <div class="password2">
                      <label for="exampleInputPassword1">Repeat Password</label>
                      <input type="password" class="form-control" id="password2" ng-model="password_confirm" placeholder="Password">
                    </div>
                    <div class="form-group">
                      <label for="about">About</label>
                      <textarea type="text" class="form-control" id="about" ng-model="about" placeholder="Wait.. wath!?"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="twitter">Twitter Username</label>
                        <input type="text" class="form-control" id="twitter" ng-model="twitter" placeholder="Twitter">
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

