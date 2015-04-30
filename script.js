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
		$(".resultsBox").append("<div class='well col-md-6 hidden slide" + i + "'><img src='" + imageInfo + "'/><p class='lead'>" + nameInfo + "</p><p>" + deckInfo + "</p></div>");
	};
	
	$('.resultsBox').prepend('<div class="btn col-md-1 col-md-offset-1 btn-danger leftBtn "><img id="leftArrow" src="leftarrow.png"/></div>');
	$('.slide0').removeClass('hidden');
	$('.resultsBox').append('<div class="btn col-md-1 btn-danger rightBtn"><img id="rightArrow" src="rightarrow.png"/></div>');


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


	$(".resultsBox").on('click', ".rightBtn", function(){
		$('.slide' + count).addClass('hidden');
		if (count >= 0 && count < 7) {
			count++;
			$('.slide' + count).removeClass('hidden');
		} else if ( count == 7 ){
			count = 0;
			$('.slide' + count).removeClass('hidden');
		};
	});


	$(".resultsBox").on('click', ".leftBtn", function(){
		$('.slide' + count).addClass('hidden');
		if (count > 0 && count <= 7) {
			count--;
			$('.slide' + count).removeClass('hidden');
		} else if ( count == 0 ){
			count = 7;
			$('.slide' + count).removeClass('hidden');
		};
	});



});


function search(query){
	$(".resultsBox").append("<div class='progress'><div class='progress-bar progress-bar-striped active' role='progressbar' style='width: 100%'>loading results....</div></div>");

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	    	$(".progress").remove();
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}