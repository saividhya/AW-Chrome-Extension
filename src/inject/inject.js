console.log("hello");

$(document).ready(function(){

	var ticking = false;

	function doSomething(scroll_pos) {
	  if(scroll_pos > 90){
	  	ticking = true;
	  	var text = $(document).attr('title');
	  	var post = text.replace(/[^a-z0-9\s]/gi, '')
	  	chrome.extension.sendMessage({ "event": "MS", "attribute": { "post" : post, "scroll_pos": scroll_pos } }, function(response) {
  			console.log("message sent")
	  	});
	  }
	}

	window.addEventListener('scroll', function(e) {
	  var winheight = $(window).height()
	  var docheight = $(document).height()
	  var scrollTop = $(window).scrollTop()
	  var trackLength = docheight - winheight
	  var pctScrolled = Math.floor(scrollTop/trackLength * 100)
	  if (!ticking) {
	    window.requestAnimationFrame(function() {
	      doSomething(pctScrolled);
	    });
	  }
	});

   var answers = $('.subheader.answers-subheader').find('span').text()
   if(answers != undefined && answers != null && answers != "null"){
   		var text = $(document).attr('title');
	  	var post = text.replace(/[^a-z0-9\s]/gi, '')
	  	chrome.extension.sendMessage({ "event": "PL", "attribute": { "post" : post, "answerscount": answers } }, function(response) {
  			console.log("message sent")
	  	});
   }

   $(".btn.js-search-submit").on("click",function(){
   		var text = ''
   		$('.f-input.js-search-field').each(function(){
		    text = $(this).val();
		});   		
   		var search = text.replace(/[^a-z0-9\s]/gi, '')
   		chrome.extension.sendMessage({ "event": "SC", "attribute": { "search": search } }, function(response) {
  		console.log("message sent")
	});
   });

   $(".question-hyperlink").on("click",function(event){
   		var parent = $(this).parents('div').attr('class')
	  	var question = $(this).text()
	  	var sourcelink = $(location).attr('href')
   		if(parent.indexOf("spacer") >= 0){
			var vote = $(this).siblings('a').text()
	   		var text = $(this).text()
	   		var question = text.replace(/[^a-z0-9\s]/gi, '')
	   		var text = $(document).attr('title');
	  		var post = text.replace(/[^a-z0-9\s]/gi, '')
	  		var link = $(this).attr('href');
	  		chrome.extension.sendMessage({ "event": "QH", "attribute": { "question": question,"vote" : vote,"source" : post,"link" : link ,"sourcelink" :sourcelink} }, function(response) {
	  			console.log("message sent")
			});
	   	}else if(parent.indexOf("summary") >= 0){
	   		var questionsummary = event.target.parentElement.parentElement.parentElement
	   		var tags = []
	   		$(questionsummary).find('[class*=tags]').find('a').each(function(){
	   			var tag = {}
	   			tag.text = $(this).text()
	   			tags.push(tag)
	   		});
	   		var target = $(questionsummary).prop('id')
	   		var answerscountid = $(this).parents('div').parents('div').attr('id')
	   		var answerscount = $(questionsummary).find('[class*=status]').find('strong').text()
	   		var vote = $(questionsummary).find('.vote-count-post ').text()
	   		var views = $("#"+answerscountid).find('[class*=views]').text()
	   		var currentpgnumber = $("span.page-numbers.current").text(); 
	   		var text = $(document).attr('title');
	  		var post = text.replace(/[^a-z0-9\s]/gi, '')
	  		var link = $(this).attr('href');
	  		var sno = $(questionsummary).index();
	  		chrome.extension.sendMessage({ "event": "QH", "attribute": { "question": question,"answerscount" : answerscount,"vote" :vote, "views":views, "currentpgnumber" : currentpgnumber,"source" : post, "link" : link, "sourcelink" :sourcelink, "sno" : sno, "tags" : tags} }, function(response) {
	  			console.log("message sent")
			});
	   	}
   });

   $(".page-numbers").on("click",function(){
   		var text = $(this).text()
   		var pagenumber = text.replace(/[^a-z0-9\s]/gi, '')
   		var title = $(document).attr('title');
	  	var post = title.replace(/[^a-z0-9\s]/gi, '')
   		chrome.extension.sendMessage({ "event": "PN", "attribute": { "post" : post , "pagenumber": pagenumber } }, function(response) {
  		console.log("message sent")
	});
   });

   $("#submit-button").on("click",function(event){

   		if($(this).val().toLowerCase().indexOf("Answer".toLowerCase()) >= 0) {
   			var parentdiv = event.target.parentElement.parentElement;
   			var answerstring = $(parentdiv).find('#wmd-input').text();
   			var answer = answerstring.replace(/[^a-z0-9\s]/gi, '')
   			var title = $(document).attr('title');
	  		var post = title.replace(/[^a-z0-9\s]/gi, '')
	   		chrome.extension.sendMessage({ "event": "PA", "attribute": { "title": post, "answer" :answer } }, function(response) {
		  		console.log("message sent")
			});
	   	}else if($(this).val().toLowerCase().indexOf("Question".toLowerCase()) >= 0) {
	   		var parentdiv = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
	   		var titlestring = $(parentdiv).find('#title').text();
	   		var title = titlestring.replace(/[^a-z0-9\s]/gi, '')
	   		var questionstring = $(parentdiv).find('#wmd-input').text()
	   		var question = questionstring.replace(/[^a-z0-9\s]/gi, '')
	   		chrome.extension.sendMessage({ "event": "PQ", "attribute": { "title": title, "question" :question } }, function(response) {
		  		console.log("message sent")
			});
	   	}
   });

   $(".post-tag").on("click",function(event){
   		var text = $(this).text()
   		var tag = text.replace(/[^a-z0-9\s]/gi, '')
   		var title = $(document).attr('title');
	  	var post = title.replace(/[^a-z0-9\s]/gi, '')
   		chrome.extension.sendMessage({ "event": "PT", "attribute": {"post" : post , "tag": tag } }, function(response) {
  		console.log("message sent")
	});
   });

   $(".answer").on("click",function(e){
   		var html = $(this).html()
   		var htmlcontent = html.replace(/[^a-z0-9\s]/gi, '')
   		var target = $(e.target).prop('class')
   		var text = $(this).find('.post-text').text()
   		var codestring = $(this).find('.post-text').find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var answer = text.replace(/[^a-z0-9\s]/gi, '')
   		var title = $(document).attr('title');
	  	var post = title.replace(/[^a-z0-9\s]/gi, '')
	  	var vote = $(e.target).siblings('span').text()
	  	
	    var authors = []
	    $(this).find('.user-details').each(function(){

	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author)

		});
	    
	   	if ( target.indexOf("vote-up-off") >= 0 || target.indexOf("vote-up-on") >= 0 ) {
			chrome.extension.sendMessage({ "event": "VU", "attribute": { "post": post,"answer": answer,"code" :code, "vote": vote, "author":authors}}, function(response) {
				console.log("message sent")
			});
		}else if ( target.indexOf("vote-down-off") >= 0 || target.indexOf("vote-down-on") >= 0 ) {
			chrome.extension.sendMessage({ "event": "VD", "attribute": { "post": post,"answer": answer,"code" :code,"vote": vote, "author":authors } }, function(response) {
				console.log("message sent")
			});
		}
   });

   $(".question").on("click",function(e){
   		var html = $(this).html()
   		console.log(html)
	    var htmlcontent = html.replace(/[^a-z0-9\s]/gi, '')
	    var authors = []

	    $(this).find('.user-details').each(function(){

	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author);

		});
	    
   		var target = $(e.target).prop('class')
   		var text = $(this).find('.post-text').text()
   		var codestring = $(this).find('.post-text').find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var question = text.replace(/[^a-z0-9\s]/gi, '')
   		var title = $(document).attr('title');
	  	var post = title.replace(/[^a-z0-9\s]/gi, '')
	  	var vote = $(e.target).siblings('span').text()
	   	if ( target.indexOf("vote-up-off") >= 0 || target.indexOf("vote-up-on") >= 0 ) {
			chrome.extension.sendMessage({ "event": "VU", "attribute": { "title": post,"question": question,"code" :code,"vote": vote , "author":JSON.stringify(authors)} }, function(response) {
				console.log("message sent")
			});
		}else if ( target.indexOf("vote-down-off") >= 0 || target.indexOf("vote-down-on") >= 0 ) {
			chrome.extension.sendMessage({ "event": "VD", "attribute": { "title": post,"question": question,"code" :code,"vote": vote , "author":JSON.stringify(authors)} }, function(response) {
				console.log("message sent")
			});
		}
   });

   $(".js-gps-track").on("click",function(){
   		var parent = $(this).parents('div').attr('id')
   		var text = $(this).text()
   		var post = text.replace(/[^a-z0-9\s]/gi, '')
   		var title = $(document).attr('title');
	  	var source = title.replace(/[^a-z0-9\s]/gi, '')
	  	var sourcelink = $(location).attr('href')
	  	var link = $(this).attr('href');
   		if(parent.indexOf("hot-network-questions") >=0 ) 
   		{
   			chrome.extension.sendMessage({ "event": "HN", "attribute": { "post": post,"source": source,"sourcelink": sourcelink,"link": link } }, function(response) {
	  			console.log("message sent")
			});
   		}
   });

   $(".star-off").on("click",function(){
   		var html = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML
   		var htmlcontent = html.replace(/[^a-z0-9\s]/gi, '')
   		var parent = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
   		var authors = []
	    $(parent).find('.user-details').each(function(){
	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author);

		});
   		var text = $(parent).text()
   		var post = text.replace(/[^a-z0-9\s]/gi, '')
   		var codestring = $(parent).find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var favcount = $(".favoritecount").text();
   		var title = $(document).attr('title');
	  	var question = title.replace(/[^a-z0-9\s]/gi, '')
	  	chrome.extension.sendMessage({ "event": "FA", "attribute": { "title": question,"post": post,"code" :code,"favcount": favcount, "author":authors } }, function(response) {
  			console.log("message sent")
		});
   });

   $(".short-link").on("click",function(event){
   		var html = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML
   		var htmlcontent = html.replace(/[^a-z0-9\s]/gi, '')
   		var parentdiv = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
   		var text = $(parentdiv).find('.post-text').text()
   		var codestring = $(parentdiv).find('.post-text').find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var post = text.replace(/[^a-z0-9\s]/gi, '')
   		var authors = []
   		var title = $(document).attr('title');
	  	var question = title.replace(/[^a-z0-9\s]/gi, '')
	    $(parentdiv).find('.user-details').each(function(){
	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author);

		});
   		chrome.extension.sendMessage({ "event": "PS", "attribute": { "title": question,"post": post,"code" :code ,  "author":authors } }, function(response) {
  			console.log("message sent")
		});
   });

   $(".suggest-edit-post").on("click",function(event){
   		var html = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML
   		var htmlcontent = html.replace(/[^a-z0-9\s]/gi, '')
   		var parentdiv = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
   		var text = $(parentdiv).find('.post-text').text()
   		var codestring = $(parentdiv).find('.post-text').find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var post = text.replace(/[^a-z0-9\s]/gi, '')
   		var authors = []
   		var title = $(document).attr('title');
	  	var question = title.replace(/[^a-z0-9\s]/gi, '')
	    $(parentdiv).find('.user-details').each(function(){
	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author);

		});
   		chrome.extension.sendMessage({ "event": "EC", "attribute": { "title": question,"post": post,"code" :code , "author":authors } }, function(response) {
  			console.log("message sent")
		});
   });

   $(".js-show-link.comments-link ").on("click",function(event){
   		var html = event.target.parentElement.parentElement.parentElement.parentElement.innerHTML
   		var htmlcontent = html.replace(/[^a-z0-9\s]/gi, '')
   		var parentdiv = event.target.parentElement.parentElement.parentElement.parentElement;
   		var text = $(parentdiv).find('.post-text').text()
   		var codestring = $(parentdiv).find('.post-text').find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var post = text.replace(/[^a-z0-9\s]/gi, '')
   		var authors = []
   		var title = $(document).attr('title');
	  	var question = title.replace(/[^a-z0-9\s]/gi, '')
	    $(parentdiv).find('.user-details').each(function(){
	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author);

		});
   		chrome.extension.sendMessage({ "event": "CL", "attribute": { "title": question,"post": post,"code" :code, "author":authors  } }, function(response) {
  			console.log("message sent")
		});
   });


   $(".snippet-code").on("click",function(event){

   		var target = $(event.target).is( ":button" )
   		var parentdiv = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
   		var text = $(parentdiv).find('.post-text').text()
   		var codestring = $(parentdiv).find('.post-text').find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var post = text.replace(/[^a-z0-9\s]/gi, '')
   		var authors = []
   		var title = $(document).attr('title');
	  	var question = title.replace(/[^a-z0-9\s]/gi, '')
	    $(parentdiv).find('.user-details').each(function(){
	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author);

		});
		if(target==true){
	   		chrome.extension.sendMessage({ "event": "SL", "attribute": { "title": question,"post": post,"code" :code, "author":authors  } }, function(response) {
	  			console.log("message sent")
			});
	   }
   });

	var timer;
	$(".answer").on("mouseenter", function(event){
		var authors = []
	  	$(this).find('.user-details').each(function(){

	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author)

		});
		var html = event.target.innerHTML
    	var htmlcontent = html.replace(/[^a-z0-9\s]/gi, '')
    	var text = $(this).find('.post-text').text()
    	var codestring = $(this).find('.post-text').find('code').text()
    	var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var answer = text.replace(/[^a-z0-9\s]/gi, '')
   		var title = $(document).attr('title');
	  	var post = title.replace(/[^a-z0-9\s]/gi, '')
	    timer = setTimeout(function () {
		  	chrome.extension.sendMessage({ "event": "ID", "attribute": { "title": post,"post": answer,"code" :code,"secs" : "3", "author":authors  } }, function(response) {
	  			console.log("message sent")
			});
	    }, 3000);
	}).on("mouseleave", "div", function(){
	    clearTimeout(timer);
	});

	$(".post-text").bind('copy', function(event) {
		var copiedtext = window.getSelection().toString()
	    var parentdiv = $(this).parent();
	    var text = $(this).text()
   		var codestring = $(this).find('code').text()
   		var code = codestring.replace(/[^a-z0-9\s]/gi, '')
   		var post = text.replace(/[^a-z0-9\s]/gi, '')
   		var authors = []
   		var title = $(document).attr('title');
	  	var question = title.replace(/[^a-z0-9\s]/gi, '')
	  	$(parentdiv).find('.user-details').each(function(){
	    	var author = {}
	    	author.name = $(this).find('a').text()
			author.reputationscore = $(this).find("[title*='reputation score']").text()
		    author.gold = $(this).find("[title*='gold badge']").text()
		    author.silver = $(this).find("[title*='silver badge']").text()
		    author.bronze = $(this).find("[title*='bronze badge']").text()
		    author.event = $(this).siblings().text()
		    authors.push(author);

		});
	    chrome.extension.sendMessage({ "event": "CP", "attribute": { "title": question,"post": post, "author":authors ,"copiedtext" : copiedtext   } }, function(response) {
  			console.log("message sent")
		});
	});

});