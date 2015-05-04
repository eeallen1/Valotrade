var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var smallImage; 
var timestamp;



document.addEventListener("deviceready", onDeviceReady, false);


 
function onDeviceReady() {
    smallImage = document.getElementById('smallImage'); 
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
   
}
 
function clearCache() {
    navigator.camera.cleanup();
}
 
var retries = 0;//sometimes the image upload fails the first try for dubious reasons
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
        smallImage.src = 'http://107.170.157.210/PicUploads/'+ timestamp +'img.jpg'; //create filename/path based on timestamp created in post.js
        smallImage.style.display = 'block';
        retries = 0;
        navigator.notification.alert('Your image has been posted! ', null, 'Upload Success', 'Okay');
    }
 
    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 750)
        } else {
            retries = 0;
            clearCache();
            alert('Error. Try again!');
        }
    }
    

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object(); 
    params.value1 = timestamp; //to be sent to server for storage
    options.params = params; 
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://107.170.157.210/ServerPHP/upload.php"), win, fail, options);
}
 
function capturePhoto(source) {
    timestamp = $("#timestamp").val(); //gets timestamp that was set in post.js
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI, sourceType: source
    });
}
 
function onFail(message) {
    navigator.notification.alert('Image not uploaded because: ' + message, null, 'Upload Failed', 'Okay');
}
