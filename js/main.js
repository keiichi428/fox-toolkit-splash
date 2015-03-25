var $posters, $selector;

var domain = '//www.fhetoolkits.com/';
var posterTemplate = '<li class="poster"><a href="' + domain + '%DIR%" target="_blank" title="%NAME%"><img src="img/%DIR%.jpg" alt="%NAME%"/></a></li>';
var selectOptionTemplate = '<option value="%DIR%">%NAME%</option>';

var alphabeticOrder;
var alphabeticOrderSuffixToIgnore = ["a", "an", "the"];


$(function(){
	$posters = $('#posters');
	$selector = $('#title-selector');

	alphabeticOrder = [];
	alphabeticOrder = alphabeticOrder.concat(data);
	
	
	
	// Remove some suffixes to ignore for alphabetic sort
	for(var i = alphabeticOrder.length - 1 ; i > 0 ; i--){
		for(var m = alphabeticOrderSuffixToIgnore.length - 1 ; m > 0 ; m--){
			if(alphabeticOrder[i].name.toLowerCase().indexOf(alphabeticOrderSuffixToIgnore[m] + " ") == 0){
				alphabeticOrder[i].name = alphabeticOrder[i].name.substr(alphabeticOrderSuffixToIgnore[m].length);
			}
		}
	}
	
	// Sort
	alphabeticOrder = alphabeticOrder.sort(alphabeticSortBy);
	
	// Populate selector
	for(i = alphabeticOrder.length - 1 ; i >= 0 ; i--){
		$selector.append(selectOptionTemplate.replace(/%DIR%/g,alphabeticOrder[i].dir).replace(/%NAME%/, alphabeticOrder[i].name));
	}
	
	
	for(i = 0, len = data.length ; i < len ; i++){
		$posters.append(posterTemplate.replace(/%DIR%/g,data[i].dir).replace(/%NAME%/g,data[i].name));
	}
	//console.log(alphabeticOrder);
	
	$selector.change(onTitleSelectorChange);
	$('.poster a').click(onPosterClick);
	
});

function onTitleSelectorChange(){
	console.log($('#title-selector option:selected').attr('value'));
	
	//window.location = '/'+$('#title-selector option:selected').attr('value');
	window.open(domain+$('#title-selector option:selected').attr('value'));
	$('#select-by-title').attr('selected','');
	dataLayer.push({'pageName':$('#title-selector option:selected').attr('value'),'event':'pageView'});
}

function onPosterClick(e){
	dataLayer.push({'pageName':$(this).attr('href'),'event':'pageView'});
}

function alphabeticSortBy(a, b){
	if(!a.name || !b.name) return 0;
	if(a.name > b.name) return -1;
	if(a.name < b.name) return 1;
}
	