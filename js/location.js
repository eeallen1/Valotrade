   // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

     // onSuccess Geolocation
    //
    function onSuccess(position) {
      /*  var longitude = document.getElementById('longitude');
        var latitude = document.getElementById('latitude');*/

       $("#latitude").val(position.coords.latitude);           
       $("#longitude").val(position.coords.longitude); 
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }