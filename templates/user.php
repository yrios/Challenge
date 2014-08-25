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
      <h1 class="blog-title">{{profile.username}}'s Blog</h1>
      <p class="lead blog-description">{{profile.about}}</p>
    </div>

    <div class="row">

        <div class="col-sm-6 blog-main">

            <div class="blog-post" ng-repeat="entry in entries">
                <h2 class="blog-post-title">{{entry.title}}</h2>
                <p class="blog-post-meta">{{ entry.creationDate | date:'MMMM d, yyyy'  }} by<a href="#"> {{entry.username}}</a></p>

                <p>{{entry.content}}</p>
                <hr>
            </div><!-- /.blog-post -->

            <ul class="pagination">
                <pagination on-select-page="changed(page)" total-items="bigtotal.length" page="currentPage" max-size="3" boundary-links="true" rotate="false" items-per-page="numPerPage"></pagination>
            </ul>
        </div><!-- /.blog-main -->

        <div class="col-sm-5 col-sm-offset-1 blog-sidebar">
          <div class="sidebar-module sidebar-module-inset">
            <h4>Tweets</h4>
            <hr>
            <div class="media" ng-repeat="tweet in tweets track by $index" ng-hide="tweet.hidden">
                <a class="pull-left" href="">
                    <img class="media-object" src="{{tweet.profile_image_url}}" alt="">
                </a>
                <div class="media-body">
                    <h4 class="media-heading">{{tweet.name}}</h4>
                    {{tweet.text}}
                </div>
                <hr>
            </div>
            
          </div>
        </div><!-- /.blog-sidebar -->
    </div><!-- /.row -->
</div><!-- /.container -->

<div class="blog-footer">
    <p>Challenge <a href="">Blog Bootstrap</a></p>
    <p><a href="#">Back to top</a></p>
</div>


