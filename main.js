const RedditApp = function() {
  let posts = [];
  const $posts = $('.posts');

  const createPost = function (postUserName, postMessage) {
    posts.push({ username: postUserName, message: postMessage, comments: []});    
  }

  const renderPosts = function() {
    $posts.empty();

    posts.forEach(post => {
      $posts.append(
      '<div class="userpost">'
      + '<div class="post-text"><div class="post-message">' + post.message + '</div>' 
      + '<div>Posted By: <b>' + post.username + '</b>'
      + '<div class="icon-row"><i class="far fa-comment comment" data-toggle="tooltip" title="Add Comment"></i>'
      + '<i class="fas fa-edit edit-post-show" data-toggle="tooltip" title="Edit Post"></i>'
      + '<i class="fas fa-eye-slash hide-comment" data-toggle="tooltip" title="Hide/Show Comments"></i>'
      + '<i class="far fa-window-close delete-post" data-toggle="tooltip" title="Delete Post"></i>'
      + '<div class="hidden-comments">Comments Hidden</div></div>'
      + '<div class="timestamp">' + getTimeStamp() + '</div></div>'
      + '<div class="edit-post">'
      + '<div><input class="edit-message" type="text" placeholder="Edit Post" />'
      + '<button type="button" class="btn btn-primary edit-post-button">Edit Post</button></div></div>'
      + '<div class="comment-post show"></div>' 
      + '<div class="comment-section"><form class="input-area add-comment"><h5>Add Comment</h5>'
      + '<div class="form-group"><input class="comment-username" type="text" placeholder="User Name" /></div>'
      + '<div class="form-group"><input class="comment-message" type="text" placeholder="Comment Text" /></div>'
      + '<button type="button" class="btn btn-primary post-comment">Add Comment</button></form></div>'
      )      
    });
    
    // Resets the user name and message fields back to empty after adding a post
    $('#username').val(''); 
    $('#message').val('');
  }

  const removePost = function (currentPost) {
    const $clickedPost = $(currentPost).closest('.userpost');

    const index = $clickedPost.index();

    posts.splice(index, 1);
    $clickedPost.remove();
  }

  const renderComments = function() {
    $('.comments-post').empty();

  }

  

  return {
    createPost: createPost,
    removePost: removePost,
    renderPosts: renderPosts,
    renderComments: renderComments
  }
}

const app = RedditApp();

$('#add-post').on('click', function() {
  const postUserName = $('#username').val();
  const postMessage = $('#message').val();

  if(postUserName && postMessage) {
    app.createPost(postUserName, postMessage);
    app.renderPosts();
    //app.renderComments();
  } else {
    alert("User Name and Message Text must not be empty");
  }
});

/* This function generates click events for each dynamically created delete post button.  It also
   confirms with the user they want to delete the post before doing so. */

   $('.posts').on("click", ".delete-post", function() {
    let confirmDeletePost = confirm("Are you sure you want to delete this post?");
    if(confirmDeletePost) {
      app.removePost(this);
    }
  });
  
  /* This function generates click events for each dynamically created delete comment button.  It also
     confirms with the user they want to delete the comment before doing so. */
  
  $(document).on("click", ".delete-comment", function() { 
    let confirmDeleteComment = confirm("Are you sure you want to delete this comment?");
    if(confirmDeleteComment) {
      $(this).closest('.comment-text').remove();
    }
  });
  
  /* This function generates click events for each dynamically created comment icon.  When the icon
     is clicked it will show or hide the add comments section for that specific post */
  
  $(document).on("click", ".comment", function() {
    if($(this).closest(".post-text").find(".add-comment").hasClass('show-add-comment')) {
      $(this).closest(".post-text").find(".add-comment").removeClass('show-add-comment');
    } else {
      $(this).closest(".post-text").find(".add-comment").addClass('show-add-comment');
    }
  });
  
  /* This function generates click events for each dynamically created edit post icon.  When the icon
     is clicked it will show or hide the edit post section for that specific post. It also grabs the value of
     the current post text and sets the edit post input field to that value when the edit post section is shown.*/
  
  $(document).on("click", ".edit-post-show", function() {
    if($(this).closest(".post-text").find(".edit-post").hasClass('show-add-comment')) {
      $(this).closest(".post-text").find(".edit-post").removeClass('show-add-comment');
    } else {
      const currentPostText = $(this).closest(".post-text").find(".post-message").html();
      $(this).closest(".post-text").find(".edit-message").val(currentPostText);
      $(this).closest(".post-text").find(".edit-post").addClass('show-add-comment');
    }
  });
  
  /* This function generates click events for each dynamically created edit post button.  When the button
     is clicked it will over write the current post text with the new value in the input field.
     It will then hide the edit post section after the edit is made. It will give an indication that the post
     was edited along with a timestamp in the edited version */
  
  $(document).on("click", ".edit-post-button", function() {
    const editedPostText =  $(this).closest(".edit-post").find(".edit-message").val();
    $(this).closest(".post-text").find(".post-message").html(editedPostText + ' (edited on: ' + getTimeStamp() + ')');
    $(this).closest(".edit-post").removeClass('show-add-comment');
  });
  
  /* This function generates click events for each dynamically created edit comment icon.  It will show and hide the edit
     comment section for that comment when pushed. It also grabs the value of the current comment text and sets the 
     edit comment input field to that value when the edit comment section is shown.  */
  
  $(document).on("click", ".edit-comment-show", function() {
    if($(this).closest(".comment-text").find(".edit-comment").hasClass('show-add-comment')) {
      $(this).closest(".comment-text").find(".edit-comment").removeClass('show-add-comment');
    } else {
      const currentCommentText = $(this).closest(".comment-text").find(".comment-message-text").html();
      $(this).closest(".comment-text").find(".edit-comment-message").val(currentCommentText);
      $(this).closest(".comment-text").find(".edit-comment").addClass('show-add-comment');
    }
  });
  
  /* This function generates click events for each dynamically created edit comment button.  When an edit comment 
     button is clicked the location of the current comment is grabbed and the HTML value is replaced by the value 
     in the edit comment input field. It will give an indication that the comment was edited along with a timestamp
     in the edited version. The edit comment section is then hidden from view. */
  
  $(document).on("click", ".edit-comment-button", function() {
    const editedCommentText =  $(this).closest(".edit-comment").find(".edit-comment-message").val();
    $(this).closest(".comment-text").find(".comment-message-text").html(editedCommentText + ' (edited on: ' + getTimeStamp() + ')');
    $(this).closest(".edit-comment").removeClass('show-add-comment'); 
  });
  
  /* This function generates click events for each dynamically created hide/show comments button.  When 
     clicked it hides or shows all of the comments on that specific post.  If the comments are hidden
     it gives an indication that the comments are hidden beside the icon row */
  
  $(document).on("click", ".hide-comment", function() {
    if($(this).closest(".post-text").find(".comment-post").hasClass('show')) {
      $(this).closest(".post-text").find(".comment-post").removeClass('show');
      $(this).closest(".icon-row").find(".hidden-comments").addClass('comments-hidden');
    } else {
      $(this).closest(".post-text").find(".comment-post").addClass('show');
      $(this).closest(".icon-row").find(".hidden-comments").removeClass('comments-hidden');
    }
  });
  
  // This function creates and returns a timestamp 
  const getTimeStamp = function () {
    const currentDate = new Date(); 
    const timeStamp = 
      (currentDate.getMonth()+1) + "/"
      + currentDate.getDate()  + "/" 
      + currentDate.getFullYear() + " @ "  
      + currentDate.getHours() + ":"  
      + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes() + ":"
      + (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    return timeStamp;
  }