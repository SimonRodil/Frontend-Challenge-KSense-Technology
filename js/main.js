function capFirLet(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

$(function() {

  var $mainURL = 'https://jsonplaceholder.typicode.com';
  var $all_posts;
  var $user_posts;

  // Main Request for Users
  $.ajax({
    'url':$mainURL+'/users',
    'datatype': 'application/json',
    'success': function ($response){
      $.each($response, function($index, $user){
        $(`
        <tr data-user-id="`+$user.id+`">
          <td>`+$user.id+`</td>
          <td class="name">`+$user.name+`</td>
          <td>`+$user.email+`</td>
          <td>`+$user.website+`</td>
          <td><button type="button" class="btn btn-info">View Posts</button></td>
        </tr>
        `).appendTo('#users_table');
      });
    }
  });

  // Main requests for posts.
  $.ajax({
    'url':$mainURL+'/posts',
    'datatype': 'application/json',
    'success': function ($posts){
      $all_posts=$posts;
    }
  });

  // Click on the button.
  $(document).on('click', '#users_table button', function(){

    // Get the user id
    var $tr = $(this).parents('tr');
    var $user_id = $tr.attr('data-user-id');

    $('#name_user').text($tr.find('.name').text());

    // Filter the posts to a certain user.
    $user_posts = $all_posts.filter($posts => $posts.userId == $user_id);
    
    // Hide and show the necessary divs.
    $('#users_container').slideUp('fast');
    $('#posts_container').slideDown('fast');
    
    // Show the data
    $.each($user_posts, function($index, $post){
      $(`
      <tr data-post-id="`+$post.id+`">
        <td>`+$post.id+`</td>
        <td>`+capFirLet($post.title).slice(0,30)+`...</td>
        <td>`+capFirLet($post.body).slice(0,50)+`...</td>
        <td><button type="button" class="btn btn-info">View Post</button></td>
      </tr>
      `).appendTo('#posts_table');
    });

  });
  
  // Click on the button.
  $(document).on('click', '#posts_table button', function(){
    
    // Get the user id
    var $post_id = $(this).parents('tr').attr('data-post-id');
    var $post = $user_posts.find($post => $post.id == $post_id);
    
    // Set the modal
    var $modal = $('#modal_post');

    // Insert the content
    $modal.find('#header_title').html(capFirLet($post.title));
    $modal.find('#post_content').html(capFirLet($post.body));

    // Show the modal
    $modal.modal('show');
  });

  // Back to list. Button
  $('#back_to_users').on('click', function(){

    // Hide and show the necessary divs.
    $('#users_container').slideDown('fast');
    $('#posts_container').slideUp('fast');

    // Clean the Posts table.
    $('#posts_table tbody').empty();

  });

});