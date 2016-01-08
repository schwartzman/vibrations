page('/', index)
page('/sound/:sound', sound)
page(function(){
	page('/')
})
page.start()

function index(){
	debug && console.log('----------index----------')
	if (!mapExists) {
		debug && console.log('no map')
		initMap(locations)
	}
	debug && console.log('infowindowOpen: '+infowindowOpen)
	if (infowindowOpen) {
		infowindow.close()
		infowindowSlug= null;
		map.fitBounds(bounds)
	}
}

function markerClicked(slug) {
	debug && console.log('markerClicked: '+slug)
	page('/sound/'+slug)
}

function sound(ctx){
	debug && console.log('----------sound----------')
	var soundSlug = ctx.params.sound
	if (infowindowSlug === soundSlug) {
		debug && console.log('infowindowSlug === soundSlug')
		// user marker click; we're just setting the URL here
		return
	}
	for (var i = 0; i < locations.length; i++) {
		soundSlugExists = false
		if (soundSlug == locations[i].slug) {
			debug && console.log('soundSlugExists = true')
			soundSlugExists = true
			break
		}
	}
	debug && console.log('soundSlugExists: '+soundSlugExists)
	if (!soundSlugExists) {
		errorDisplay('Sorry, there is no sound called<br>'+soundSlug, true)
		return
	}
	// the infowindow doesn't match the desired sound or is absent; the sound exists - open it
	function clickIt(){
		google.maps.event.trigger(markers[soundSlug], 'click', false)
	}
	if (mapExists) {
		// we have a map
		clickIt()
	} else {
		// loading a URL directly
		initMap(locations)
		google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
			clickIt()
		})
	}
}
