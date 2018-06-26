export default {
	debug: true,

	errorDisplay (msg, closer = false){
		let res = '<h2>'+msg+'</h2>'
		res += (closer) ? '<a href="/" class="error-closer">&#x2a09</a>' : ''
		res = '<div class="error"><div class="inner">'+res+'</div></div>'
		$('#map').html(res)
	},

	setTitle (input = false){
		const base = 'Vibrations'
		const append = (input) ? ': '+input : ''
		$(document).prop('title', base+append)
	}
}
