var pictureSource;   // picture source
var destinationType; // sets the format of returned value
 
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
 
function clearCache() {
    navigator.camera.cleanup();
}
 
var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        var smallImage = document.getElementById('smallImage'); 
        smallImage.style.display = 'block';
        smallImage.src = "http://107.170.157.210/PicUploads/valoimg.jpg";
        smallImage.value="http://107.170.157.210/PicUploads/valoimg.jpg"
        //clearCache();
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
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://107.170.157.210/ServerPHP/upload.php"), win, fail, options);
}
 
function capturePhoto(source) {
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI, sourceType: source
    });
}
 
function onFail(message) {
    navigator.notification.alert('Image not uploaded because: ' + message, null, 'Upload Failed', 'Okay');
}
