// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts


function sendPostMessage(event,attribute) {
	// body...
	var data = {}; 
	var username = '';
	var sessionId = '';
	console.log("sendPostMessage")
	chrome.cookies.get({ url: 'http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com', name: 'username' },
	  function (cookie) {
	  	if (cookie) {
	      username = cookie.value;
	    }
	});
	chrome.cookies.get({ url: 'http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com', name: 'sessionId' },
	  function (cookie) {
	  	console.log("cookie")
	    if (cookie) {
	      sessionId = cookie.value;
	      console.log(username)
	      console.log(sessionId)
	      if( username !=null && username != "null" && sessionId !=null && sessionId != "null" )
	      {
        	data.username = username;
	        data.sessionId = sessionId;
	        data.attribute = attribute;
	        if(event=="SC"){
		        data.action = "Search Bar clicked"
	        }else if(event=="QH"){
		        data.action = "Question hyperlink clicked"
	        }else if(event=="PN"){
		        data.action = "Clicked different page"
	        }else if(event=="BT"){
		        data.action = "Ask Question clicked"
	        }else if(event=="VU"){
		        data.action = "Vote Up clicked"
	        }else if(event=="VD"){
		        data.action = "Vote Down clicked"
	        }else if(event=="HN"){
		        data.action = "Hot Network Question clicked"
	        }else if(event=="PT"){
		        data.action = "Related tag clicked"
	        }else if(event=="MS"){
		        data.action = "Mouse Scroll"
	        }else if(event=="PA"){
		        data.action = "Post Answer"
	        }else if(event=="PQ"){
		        data.action = "Post Question"
	        }else if(event=="PL"){
		        data.action = "Page Load"
	        }else if(event=="FA"){
		        data.action = "Favorite"
	        }else if(event=="BK"){
		        data.action = "Bookmark"
	        }else if(event=="PS"){
		        data.action = "Share Post"
	        }else if(event=="EC"){
		        data.action = "Edit Post"
	        }else if(event=="ID"){
		        data.action = "User Idle"
	        }else if(event=="CL"){
		        data.action = "Comments clicked"
	        }else if(event=="SL"){
		        data.action = "Snippet clicked"
	        }else if(event=="CP"){
		        data.action = "Copied text"
	        }
	        //var jsonString = "jsonString=" + JSON.stringify(data);
	        var jsonString = JSON.stringify(data);
			console.log(jsonString)
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST","http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com:8000/events",true);
			xmlhttp.setRequestHeader("Content-type","application/json");
			xmlhttp.send(jsonString);
		  }
	    }
	});
}

chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
   console.log("bookmark")  
   console.log(bookmark)
   sendPostMessage("BK",{"attribute": { "title" : bookmark.title, "url" : bookmark.url}})
});


chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log("message recvd")
  	sendPostMessage(request.event,request.attribute)
});