/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

      var pictureSource;   // picture source
      var destinationType; // sets the format of returned value
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },


    onPhotoURISuccess: function(imageURI){

        //Show the selected image
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
        smallImage.src = imageURI;

    },

    getPhoto: function(source){

      pictureSource = navigator.camera.PictureSourceType;
      destinationType = navigator.camera.DestinationType;
         // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });

    },

    uploadPhoto: function(){

          //selected photo URI is in the src attribute (we set this on getPhoto)
        var imageURI = document.getElementById('smallImage').getAttribute("src");
        if (!imageURI) {
            alert('Please select an image first.');
            return;
        }

        //set upload options
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        options.params = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            workplace: document.getElementById("workplace").value
        }

        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI("http://107.170.157.210/ServerPHP/upload.php"), win, fail, options);
    },

    onFail: function(messsage){
         console.log('Failed because: ' + message);
    },

    win: function(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        //alert("Response =" + r.response);
        console.log("Sent = " + r.bytesSent);
    },

    fail: function(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
};
