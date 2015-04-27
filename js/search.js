/*jQuery(document).ready(function($) {*/
$(document).on('pageinit', '#home', function(){ 

       // $('#post-list').append('<li><a href="" data-id=""' + '"H4H4H4H4"</li>' + '<br>'); 
      //  $('#post-list').listview('refresh'); 

    $('form').submit(function(e){
        $('#post-list').empty();
        e.preventDefault();
        makeAjaxRequest();
        return false;
    });

    function makeAjaxRequest() {
        //get result from server as JSON object
        $.ajax({
            url: 'http://107.170.157.210/ServerPHP/search.php',
            datatype: "jsonp",
            data: {search: $('input#search').val()},
            async: true,
            success: function(result) {

               console.log(JSON.parse(result)); 
                       
                ajax.parseJSONP(JSON.parse(result));
               
            },
             error: function (request,error) {
                alert('Network error has occurred please try again!');
            }
        });
    }; 
}); 



  /*   $(document).on('pagebeforeshow', '#headline', function(){      
        $('#post-data').empty();
        $.each(postInfo.result, function(i, row) {
            if(row.id == postInfo.id) {
                $('#post-data').append('<li>Title: '+row.Title+'</li>');        
                $('#post-data').listview('refresh');            
            }
        });    
    });*/


     function populateData(){
          $('#post-data').empty();
        $.each(postInfo.result, function(i, row) {
            //console.log(postInfo.result); 
            if(row.ID == postInfo.id) {
                $('#post-data').append('<img onerror=' + "this.src='http://107.170.157.210/EliSeniorProject/SeniorProject/www/img/book.png'" + ' style="width:100px;height:130px" src="'+row.Image+'">'+'<li>Title: '+row.Title+'</li>' + '<li>Edition: '+row.Edition+'</li>' + '<li>Author: '+row.Author+'</li>' + '<li>Condition: '+row.Cond+'</li>' + '<li>Contact: '+row.Contact+'</li>' + '<li>For Sale: '+row.Sell+'</li>' + '<li>Trade: '+row.Trade+'</li>' + '<li>Price: '+row.Price+'</li>' + '<li>Info: '+row.Info+'</li>');        
                $('#post-data').listview('refresh');            
            }
        });

     }
  /*  $('form').submit(function(e){      
        $('#post-data').empty();
        $.each(postInfo.result, function(i, row) {
            if(row.id == postInfo.id) {
                $('#post-data').append('<li>Title: '+row.Title+'</li>');        
                $('#post-data').listview('refresh');            
            }
        });    
    });*/

     $(document).on('vclick', '#post-list li a', function(){  

            postInfo.id = $(this).attr('data-id');
         //   console.log(postInfo.id); 
            $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
            populateData(); 

        });

     var postInfo = {
      id : null,
     result : null
    }


     var ajax = {  
        parseJSONP:function(result){  
                postInfo.result = result;
              //  console.log(result);
                $('#searchh3').text("No Results to Show"); 
                $.each(result, function(i, row) {
                    console.log(JSON.stringify(row));  
                    $('#searchh3').text("Search Results");
                   // console.log(row.ID); 
                    $('#post-list').append('<li><a href="" data-id="' + row.ID + '"><h3>' +'<img onerror=' + "this.src='http://107.170.157.210/EliSeniorProject/SeniorProject/www/img/book.png'" + ' style="width:50px;height:70px" src="'+row.Image+'"><br>'+ row.Title + '</h3><p>Author: ' +row.Author +'<br>Edition: ' + row.Edition + ' <br>Price: $' + row.Price + '</p></a></li>');
                });
                $('#post-list').listview('refresh');

                // populateData(); 
            }
        }

   /* $.ajax({
        url: 'http://107.170.157.210/ServerPHP/search.php',
        type: 'get',
        data: {search: $('input#search').val()},
        success: function(response) {
            $('table#resultTable tbody').html(response);
        }
    });*/

