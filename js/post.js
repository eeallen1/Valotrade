// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
window._cordovaNative = true;

  function onDeviceReady() {
 		// Do cool things here...
        }

$(document).ready(function(){
 
 var phoneName = window.device.name;
    var phoneName = device.name;
    console.log(phoneName); 

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



function getImage() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto, function(message) {
			alert('get picture failed');
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
            );
 
    	}


    	function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
 
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://107.170.157.210/ServerPHP/upload.php", win, fail, options);
        }
 
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
        }
 
        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        }