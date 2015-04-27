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
 
var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
       /* var smallImage = document.getElementById('smallImage'); */
        smallImage.style.display = 'block';
        smallImage.src = "http://107.170.157.210/PicUploads/" + timestamp + "img.jpg";
        retries = 0;
        navigator.notification.alert('Your image has been posted!', null, 'Upload Success', 'Okay');
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
    params.timestamp = timestamp;
    options.params = params; 
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://107.170.157.210/ServerPHP/upload.php"), win, fail, options);
}
 
function capturePhoto(source) {
    timestamp = smallImage.src; 
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI, sourceType: source
    });
}
 
function onFail(message) {
    navigator.notification.alert('Image not uploaded because: ' + message, null, 'Upload Failed', 'Okay');
}
