import initMap from './initMap'
import t from './tools'

export default {
	index (ctx){
		t.debug && console.log('index')

		t.setTitle()
		const map = $('#map').data()
		if (map.map) {
			t.debug && console.log('map exists, closing infowindow')
			if (map.infowindow.map) {
				map.infowindow.close()
			}
			return
		}

		// loading from a URL directly
		t.debug && console.log('loading map')
		initMap(locations)
	},

	sound (ctx){
		t.debug && console.log('sound')

		function triggerClick (markers){
			t.debug && console.log('synthetic click', soundSlug)
			google.maps.event.trigger(markers[soundSlug], 'click', false)
		}

		const soundSlug = ctx.params.sound
		let map = $('#map').data()

		if (ctx.state.click && map.map) {
			t.debug && console.log('human click or history')
			const iwSlug = $(map.infowindow.getContent()).data('slug')
			if (!map.infowindow.map || iwSlug != soundSlug) {
				triggerClick(map.markers)
			}
			return
		}

		// loading from a URL directly
		let soundSlugValid = false
		if (locations.some(x => x.slug == soundSlug)) {
			soundSlugValid = true
		}
		t.debug && console.log('soundSlugValid:', soundSlugValid)
		if (!soundSlugValid) {
			t.errorDisplay('Sorry, there is no sound called<br>'+soundSlug, true)
			return
		}

		initMap(locations)
		map = $('#map').data()
		google.maps.event.addListenerOnce(map.map, 'tilesloaded', () => {
			triggerClick(map.markers)
		})
	}
}
