// Wait for PhoneGap to load

$(document).ready(function(){


 //arbitrary identifier for this session. Used to generate image url 
 var timestamp = parseInt(new Date().getTime() / 1000);
 $('#timestamp').val(timestamp);
 console.log(timestamp);
	var condition = "Unknown"; 
	$('#condradio input').on('change', function() {
				
	           condition = $('input[name="condition"]:checked', '#condradio').val();
	 
	});
	var trade = "Unknown";
	$('#traderadio input').on('change', function() {
				
	           trade= $('input[name="trade"]:checked', '#traderadio').val();
	 
	});

	$("#submit_post").click(function(){
		var title = $("#title").val();
		var edition = $("#edition").val();
		var author =$("#author").val();
		//var condition = $('input[name=#condition]:checked').val();
		var contact = $("#contact").val();
		var price = $("#price").val();
		var info = $("#info").val();
		var image = $('img')[2].src 
		

		console.log(image); 
		// Returns successful data submission message when the entered information is stored in database.
		var dataString = 'title=' + title + '&edition=' + edition + '&author=' + author + '&condition=' + condition
		+'&contact=' + contact + '&trade=' + trade + '&price=' + price + '&info=' + info + '&image=' + image + '&timestamp=' + timestamp;
		if (title == '' || edition == '' || author == '' || condition == "Unknown" || contact == '' || trade == "Unknown") 
		{
			//navigator.notification.alert('Please fill required fields', null, 'Incomplete Form', 'Okay'");
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
					window.location.replace("index.html");
					  //navigator.notification.alert('Your book has been posted!', null, 'Post Success', 'Okay');
				}
			});
		}
		return false;
	});

	

});



