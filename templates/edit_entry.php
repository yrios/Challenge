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
            <ul class="nav navbar-nav">
              <li><a class="blog-nav-item" href="">Create New Entry</a></li>
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
      <h1 class="blog-title">Edit Entry</h1>
    </div>

    <div class="row">
        <div class="col-sm-6 blog-main">
            <div class="blog-post">
                <form ng-submit="editEntry()" role="form">
                    <div class="form-group">
                      <label for="title">Title</label>
                      <input type="text" class="form-control" id="title" ng-model="title" placeholder="Awesome title">
                    </div>
                    <div class="form-group">
                      <label for="content">Content</label>
                      <textarea type="text" class="form-control" id="content" ng-model="content" ng-trim="false" maxlength="200" placeholder="Wait.. wath!?"></textarea>
                      <span>{{200 - content.length}} left</span>
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

