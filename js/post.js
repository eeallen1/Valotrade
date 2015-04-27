// Wait for PhoneGap to load

$(document).ready(function(){
 

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
		var image = $("#image").val(); 

		console.log("condition " + condition); 
		// Returns successful data submission message when the entered information is stored in database.
		var dataString = 'title=' + title + '&edition=' + edition + '&author=' + author + '&condition=' + condition
		+'&contact=' + contact + '&sell=' + sell + '&trade=' + trade + '&price=' + price + '&info=' + info + '&image=' + image;
		if (title == '' || edition == '' || author == '' || condition == '' || contact == '') 
		{
			alert("Please Fill All Fields");
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
					alert(result);
				}
			});
		}
		return false;
	});

	

});



