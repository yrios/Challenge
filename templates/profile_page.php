
<div class="blog-masthead">
    <div class="container">
        <nav class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><a class="blog-nav-item" href="#/entry/create">Create New Entry</a></li>
            </ul>
            <ul class="nav navbar-nav pull-right">
                <li><a href="#/main/{{currentuser.username}}" class="blog-nav-item" >{{currentuser.username}}</a></li>
                <li><a href="" ng-click="logout()" class="blog-nav-item" >Logout</a></li>
            </ul>
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
                <p class="blog-post-meta">{{ entry.creationDate | date:'MMMM d, yyyy'  }} by<a href=""> {{entry.username}}</a></p>

                <p>{{entry.content}}</p>
                <button type="button" ng-click="editEntry(entry)" class="btn btn-link btn-lg" ng-hide="!entry.editable">Edit this post</button>
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
            <div class="media" ng-repeat="tweet in tweets track by $index" ng-hide="hidden(tweet.isOwner,tweet.hidden)">
                <a class="pull-left" href="#">
                    <img class="media-object" src="{{tweet.profile_image_url}}" alt="">
                </a>
                <div class="media-body">
                    <h4 class="media-heading">{{tweet.name}}</h4>
                    {{tweet.text}}
                </div>
                <button type="button" ng-click="hideUnhide($index,tweet.action)" class="btn btn-defaul btn-sm" ng-hide="!tweet.isOwner">{{tweet.action}}</button>
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

