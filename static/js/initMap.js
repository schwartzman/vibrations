import page from 'page'

import mapStyle from './mapStyle'
import t from './tools'

export default locations => {
	function build_marker(loc) {
		return new google.maps.Marker({
			position: new google.maps.LatLng(loc.lat, loc.lon),
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: 'orange',
				fillOpacity: 0.4,
				scale: 10,
				strokeColor: 'orange',
				strokeOpacit: 0.6,
				strokeWeight: 2
			},
			map: map
		})
	}

	function build_listener(loc, marker) {
		let when = loc.date
			when += (loc.date && loc.time) ? ' at ' + loc.time : ''
		const windowContent =
			`<div class="infowindow-content" data-slug="${loc.slug}">
				<p><span class="title">${loc.title}</span>${when}</p>
				<div class="soundcloud">
					<iframe width="100%" height="20" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${loc.id}&amp;color=ff9900&amp;inverse=false&amp;auto_play=false&amp;show_user=false"></iframe>
					<div class="spinner small loader"><div>
				</div>
			</div>`
		return pushRoute => {
			infowindow.setContent(windowContent)
			infowindow.open(map, marker)
			if (!!pushRoute) {
				page.show('/sound/'+loc.slug, {'click': true})
			}
		}
	}

	const $map = $('#map')

	const map = new google.maps.Map($map[0], {
	  zoom: 0,
	  center: new google.maps.LatLng(0,0),
	  styles: mapStyle
	})
	const bounds = new google.maps.LatLngBounds()
	const infowindow = new google.maps.InfoWindow({
		maxWidth: 300
	})
	const markers = []

	infowindow.addListener('domready', () => {
		const scWidget = SC.Widget($('.soundcloud > iframe')[0])
		scWidget.bind(SC.Widget.Events.READY, () => {
			t.debug && console.log('scWidget ready')
			$('.loader').animate({opacity: 'hide'}, 'slow')
		})
		const $content = $($.parseHTML(infowindow.content))
		t.setTitle( $content.find('span.title').text() )
	})

	infowindow.addListener('closeclick', () => {
		page.show('/', {'click': true})
	})

	for (let loc of locations) {
		const marker = build_marker(loc)
		markers[loc.slug] = marker
		bounds.extend(marker.position)
		marker.addListener('click', build_listener(loc, marker))
	}

	map.fitBounds(bounds)

	$map.data({
		'map': map,
		'markers': markers,
		'infowindow': infowindow
	})
}
