import page from 'page'

import t from './tools'
import routes from './routes'

if (typeof(locations) == 'undefined') {
	t.errorDisplay('Sorry, something went wrong.<br>Please try again later.')
	throw 'fatal error: No data'
}

page('/', routes.index)
page('/sound/:sound', routes.sound)
page('*', '/')
page.start()

$(() => {
	$('span.sound-count').text(() => locations.length)

	$('.error-closer').click(() => {
		page('/')
		$('.error').detach()
	})
})
