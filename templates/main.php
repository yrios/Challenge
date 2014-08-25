<div class="blog-masthead">
    <div class="container">
        <nav class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><a class="blog-nav-item" href="#/entry/create">Create New Entry</a></li>
            </ul>
            <ul class="nav navbar-nav pull-right">
                <li><a href="" class="blog-nav-item" >{{currentuser.username}}</a></li>
                <li><a href="" ng-click="logout()" class="blog-nav-item" >Logout</a></li>
            </ul>
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
                <p class="blog-post-meta">{{ entry.creationDate | date:'MMMM d, yyyy'  }} by<a href="#"> {{entry.username}}</a></p>

                <p>{{entry.content}}</p>
                <button type="button" ng-click="editEntry(entry)" class="btn btn-link btn-lg" ng-hide="!entry.editable">Edit this post</button>
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


