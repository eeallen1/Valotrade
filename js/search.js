var longitude = 81.5372803; 
var latitude = 31.3659726; 




$(document).on('pageinit', '#home', function(){ 

    $('form').submit(function(e){
        $('#post-list').empty();
        e.preventDefault();
        makeAjaxRequest();
        return false;
    });

    function makeAjaxRequest() {
      //console.log($('input#search').val());
        //get result from server as JSON object
        $.ajax({
            url: 'http://107.170.157.210/ServerPHP/search.php',
            datatype: "jsonp",
            data: {search: $('input#search').val()},
            async: true,
            success: function(result) {
        
                ajax.parseJSONP(JSON.parse(result));
               
            },
             error: function (request,error) {

                alert('Network error has occurred please try again!');
            }
        });
    }; 
}); 





     function populateData(){
          $('#post-data').empty();
        $.each(postInfo.result, function(i, row) {
            if(row.ID == postInfo.id) {
                $('#post-data').append('<div><img onerror=' + "this.src='http://107.170.157.210/EliSeniorProject/SeniorProject/www/img/book.png'" + ' style="width:150px;height:150px" src="'+row.Image+'"></div>'+'<li>Title: '+row.Title+'</li>' + '<li>Edition: '+row.Edition+'</li>' + '<li>Author: '+row.Author+'</li>' + '<li>Category: '+row.Category+'</li>'+ '<li>Condition: '+row.Cond+'</li>' + '<li>Contact: '+row.Contact+'</li>' + '<li>Trade: '+row.Trade+'</li>' + '<li>Price: '+row.Price+'</li>' + '<li>Info: '+row.Info+'</li>');        
                $('#post-data').listview('refresh');            
            }
        });

     }

     $(document).on('vclick', '#post-list li a', function(){  

            postInfo.id = $(this).attr('data-id');
            $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
            populateData(); 

        });

      //if any of the category listview are selected from different page
      $(document).on('vclick', '#catlist li a', function(){ 

          window.location.replace("search.html");
         $('input#search').val($(this).attr('data-id')); 
	 console.log($(this).attr('data-id')); 
         $('form').submit(); 

        });

     var postInfo = {
      id : null,
     result : null
    }


     var ajax = {  
        parseJSONP:function(result){  
                postInfo.result = result;
                $('#searchh3').text("No Results to Show"); 
                $.each(result, function(i, row) {
                  if(distance(latitude, longitude, row.latitude, row.longitude) >= 30){
                    $('#searchh3').text("Search Results");
                    $('#post-list').append('<li><a href="" data-id="' + row.ID + '"><h3>' +'<div><img onerror=' + "this.src='http://107.170.157.210/EliSeniorProject/SeniorProject/www/img/book.png'" + ' style="width:50px;height:70px" src="'+row.Image+'"></div><br>'+ row.Title + '</h3><h2>Author: ' +row.Author +'<br>Edition: ' + row.Edition + ' <br>Price: ' + row.Price + '</h2></a></li>');
                  }
                });
                $('#post-list').listview('refresh');
            }
        }





// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

 // onSuccess Geolocation
function onSuccess(position) {
  longitude = position.coords.latitude;
  latitude = position.coords.longitude;
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

//adapted from geodatasource.com
//returns distance in miles between 2 points
function distance(lat1, lon1, lat2, lon2) {


  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}                                                                           


