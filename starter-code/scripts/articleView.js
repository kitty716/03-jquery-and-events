// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var val = $(this).find('address a').text(); //pick up author's name
    var optionTag = '<option value"' + val + '">' + val + '</option>';
    $('#author-filter').append(optionTag);

    val = $(this).attr('data-category');
    optionTag = '<option value="' + val + '">' + val + '</option>';
    if ($('#category-filter option[value="' + val + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }

  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    	if($(this).val()) {
		/* TODO: If the select box changes to an option that has a value, we should:
			1. Hide all the articles,
			2. Fade in only the articles that match based on the auther that was selected. (Hint: attribute selector???)  */
      	$('article').hide();
      $('[data-attribute="' + this.value + '"]').fadeIn('fast');

    } else {
		/* TODO: Otherwise, we should:
			1. Show all the articles,
			2. Except that one article we are using as a template. */
      $('article').not('.template').show();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
	/* TODO: Just like we do for #author-filter above, we should handle change events on the #category-filter element. Be sure to reset the #author-filter while you are at it! */
  $('#category-filter').on('change', function() {
    if ($(this).val()){
      $('article').hide();
      $('article[data-category="' + this.value + '"]').fadeIn('fast');
    }
    else {
      $('article').not('.template').show();
    }
  });
  $('#author-filter').val('');
};

articleView.handleMainNav = function() {
	/* TODO: Complete the delegated event handler below to help power the tabs feature.
	Clicking any .tab element should:
	1. Hide all the .tab-content sections.
	2. Fade in the single .tab-content section that is associated with the clicked .tab element's data-content attribute. Click Home Hide About, Click About Hide Home*/

  $('.main-nav').on('click', '.tab', function(){
    $('.tab-content').hide();
    var val = $(this).attr('data-content');
    $('#' + val).fadeIn('fast');
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
	/* NOTE: this hides any elements after the first 2 (<p> tags in this case) in any article body: */
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#articles').on('click', '.read-on', function() {
    event.preventDefault();
    $(this).parent().find('*').fadeIn('fast');
    $(this).text('Show less');
    $(this).attr('class', 'show-less');
    $(this).removeClass('.read-on');
  });
	/* TODO: Add a delegated event handler to reveal the remaining body section. When a .read-on link is clicked, we can:
		1. Prevent the default action of a link.
		2. Reveal everything in that particular article now.
		3. Hide the read-on link! (Might need event delegation here) */

	// STRETCH GOAL!: change the 'Read More' link to 'Show Less'
  $('#articles').on('click', '.show-less', function() {
    event.preventDefault();
    $('.article-body *:nth-of-type(n+2)').hide();
    $(this).text('Read on');
    $(this).attr('class', 'read-on');
    $(this).removeClass('.show-less');
  });
};

//TODO: Invoke all of the above functions (I, mean, methods!);
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
