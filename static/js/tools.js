export default {
	debug: false,

	errorDisplay (msg, closer = false){
		let c = `<h2>${msg}</h2>`
		c += (closer) ? '<a href="/" class="error-closer">&#x2a09</a>' : ''
		const res = `<div class="error">${c}</div>`
		$('#map').html(res)
	},

	setTitle (input = false){
		const base = 'Vibrations'
		const append = (input) ? ': '+input : ''
		$(document).prop('title', base+append)
	}
}
