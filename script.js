var apikey = 'e27fa347f5134d05d053b02acb00c1153f892615';
var slideArray = [];


// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
	for (var i = 0; i < 8; i++){
		slideArray[i] = results[i];
	}
    console.log(results);
    console.log(slideArray[1].name);
}


$(document).ready(function() {
	$(".searchBtn").on("click", function(){
		var searchField = $("#searchField").val();
		$("#searchField").val('');
		search(searchField);
	});

});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}