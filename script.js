var apikey = 'e27fa347f5134d05d053b02acb00c1153f892615';
var slideArray = [];
var count = 0;


function searchCallback(results) {
	for (var i = 0; i < 8; i++){
		slideArray[i] = results[i];
	}

	for (i = 0; i < slideArray.length; i++){
		var imageInfo = slideArray[i].image.small_url;
			if(imageInfo == null || imageInfo == undefined){
				imageInfo = "PLACE HOLDER FILL IN HERE";
			};
		var nameInfo = slideArray[i].name;
		var deckInfo = slideArray[i].deck;
			if (deckInfo == null || deckInfo == undefined){
				deckInfo = "TOP SECRET (.... or nothing is available)";
			};
		$(".resultsBox").append("<div class='well hidden slide" + i + "'><img src='" + imageInfo + "'/><p class='lead'>" + nameInfo + "</p><p>" + deckInfo + "</p></div>");
	};

    console.log(results);
    console.log(slideArray[1].name);
}


$(document).ready(function() {
	$(".searchBtn").on("click", function(){
		var searchField = $("#searchField").val();
		$("#searchField").val('');
		search(searchField);
	});

	$("#searchField").keypress(function(e){
		if(e.which == 13){
			$(".searchBtn").click();
		};
	});

	$(".rightBtn").on('click', function(){
		if (count < 8){
			$('.slide' + (count-1)).addClass('hidden');
			$('.slide' + count).removeClass('hidden');
			count++;
		} else {
			count = 0;
		};
	});

	$(".leftBtn").on('click', function(){
		if (count >= 0){
			$('.slide' + count).removeClass('hidden');
			$('.slide' + (count+1)).addClass('hidden');
			count--;
		} else {
			count = 7;
		};
	});



});



function search(query){
	$(".resultsBox").append("<div class='loading'>loading results....</div>");

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	    	$(".loading").remove();
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}