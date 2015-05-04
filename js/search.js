$(document).on('pageinit', '#home', function(){ 

    
    $('form').submit(function(e){
        $('#post-list').empty();
        e.preventDefault();
        makeAjaxRequest();
        return false;
    });

    function makeAjaxRequest() {
      console.log($('input#search').val());
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
                    console.log(JSON.stringify(row));  
                    $('#searchh3').text("Search Results");
                    $('#post-list').append('<li><a href="" data-id="' + row.ID + '"><h3>' +'<div><img onerror=' + "this.src='http://107.170.157.210/EliSeniorProject/SeniorProject/www/img/book.png'" + ' style="width:50px;height:70px" src="'+row.Image+'"></div><br>'+ row.Title + '</h3><h2>Author: ' +row.Author +'<br>Edition: ' + row.Edition + ' <br>Price: ' + row.Price + '</h2></a></li>');
                });
                $('#post-list').listview('refresh');
            }
        }


