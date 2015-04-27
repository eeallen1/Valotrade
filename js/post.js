// Wait for PhoneGap to load

$(document).ready(function(){


 //arbitrary identifier for this session. Used to generate image url 
 var timestamp = new Date().getTime() / 1000;
 $('img')[2].src = parseInt(timestamp);
 //console.log( $('img')[2].src);
	var condition = "Unknown"; 
	$('#condradio input').on('change', function() {
				
	           condition = $('input[name="condition"]:checked', '#condradio').val();
	 
	});

	$("#submit_post").click(function(){
		var title = $("#title").val();
		var edition = $("#edition").val();
		var author =$("#author").val();
		//var condition = $('input[name=#condition]:checked').val();
		var contact = $("#contact").val();
		var sell = $("#sell").is(':checked');
		var trade = $("#trade").is(':checked'); 
		var price = $("#price").val();
		var info = $("#info").val();
		var image = $('img')[2].src 
		

		console.log(image); 
		// Returns successful data submission message when the entered information is stored in database.
		var dataString = 'title=' + title + '&edition=' + edition + '&author=' + author + '&condition=' + condition
		+'&contact=' + contact + '&sell=' + sell + '&trade=' + trade + '&price=' + price + '&info=' + info + '&image=' + image + '&timestamp=' + timestamp;
		if (title == '' || edition == '' || author == '' || condition == '' || contact == '') 
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



