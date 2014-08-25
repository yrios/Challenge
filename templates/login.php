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
            <form class="navbar-form navbar-right" ng-submit="login()" role="form">
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
      <h1 class="blog-title">Challenge Blog</h1>
      <p class="lead blog-description">The Blog of Awesome!.</p>
    </div>

    <div class="row">

        <div class="col-sm-10 blog-main">

            
            <div class="blog-post" ng-repeat="entry in entries">
                <h2 class="blog-post-title">{{entry.title}}</h2>
                <p class="blog-post-meta">{{ entry.creationDate | date:'MMMM d, yyyy'  }} by<a href="#/login/{{entry.username}}"> {{entry.username}}</a></p>

                <p>{{entry.content}}</p>
                <hr>
            </div><!-- /.blog-post -->

            <ul class="pagination">
                <pagination on-select-page="changed(page)" total-items="bigtotal.length" page="currentPage" max-size="3" boundary-links="true" rotate="false" items-per-page="numPerPage"></pagination>
            </ul>
        </div><!-- /.blog-main -->
    </div><!-- /.row -->
</div><!-- /.container -->

<div class="blog-footer">
    <p>Blog template built for <a href="http://getbootstrap.com">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
    <p>
      <a href="#">Back to top</a>
    </p>
</div>


