var map
var bounds
var markers = {}
var mapExists = false
var infowindow
var infowindowOpen = false
var infowindowSlug
var debug = false

function errorDisplay(msg, closer){
	var closer = closer || false
	var result = '<h2>'+msg+'</h2>'
	result += closer ? '<a href="/" class="error-closer">&#x2a09</a>' : ''
	result = '<div class="error"><div class="inner">'+result+'</div></div>'
	$('#map').html(result)
}

if (typeof(locations) == 'undefined') {
	errorDisplay('Sorry, something went wrong.<br>Please try again later.')
	throw 'fatal error: No data'
}

$(function(){

	$('span.sound-count').text(function(){
		return locations.length
	});

	$('.error-closer').click(function(){
		page('/')
		$('.error').detach()
	})

	if ( $('.error-send').length ) {
		$errorSend = $('.error-send')
		errorDisplay( $errorSend.text() )
		$errorSend.detach()
	}
	
})
