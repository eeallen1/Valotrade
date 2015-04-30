// Wait for PhoneGap to load

$(document).ready(function(){


	 //arbitrary identifier for this post "session". Used to generate image url 
	 var timestamp = parseInt(new Date().getTime() / 1000);
	 $('#timestamp').val(timestamp);
	 console.log(timestamp);

 	// variable for condition, which is a required field. Variable is set when value of the button is changed
	var condition = "Unknown"; 
	$('#condradio input').on('change', function() {
				
	           condition = $('input[name="condition"]:checked', '#condradio').val();
	 
	});

	//variable that represents yes/no for trading. 
	var trade = "Unknown";
	$('#traderadio input').on('change', function() {
				
	           trade= $('input[name="trade"]:checked', '#traderadio').val();
	 
	});

	$("#submit_post").click(function(){

		//get values of input fields 
		var title = $("#title").val();
		var edition = $("#edition").val();
		var author =$("#author").val();
		var category=$("#category").val(); 
		var contact = $("#contact").val();
		var price = $("#price").val();
		var info = $("#info").val();
		var image = $('img')[2].src 
		
		// Returns successful data submission message when the entered information is stored in database.
		var dataString = 'title=' + title + '&edition=' + edition + '&author=' + author + '&category=' + category + '&condition=' + condition
		+'&contact=' + contact + '&trade=' + trade + '&price=' + price + '&info=' + info + '&image=' + image + '&timestamp=' + timestamp;
		if (title == '' || edition == '' || author == '' || condition == "Unknown" || contact == '' || trade == "Unknown" || category =='') 
		{
			navigator.notification.alert('Please fill required fields', null, 'Incomplete Form', 'Okay');
		} 
		else 
		{
			// AJAX Code To Submit Form.
			$.ajax({
				type: "POST",
				url: "http://107.170.157.210/ServerPHP/post.php",
				data: dataString,
				cache: false,
				success: function(result){
					window.location.replace("index.html");//redirect to home on post success
					 navigator.notification.alert('Your book has been posted!', null, 'Post Success', 'Okay');
				}
			});
		}
		return false;
	});

	

});



