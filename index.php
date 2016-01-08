<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <?php
        define('ROOT', $_SERVER['DOCUMENT_ROOT']);
        include ROOT.'/config.php';
        ?>
        <title>Vibrations.Earth</title>
        <meta name="description" content="A soundmap showcasing field recordings from around the world.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="msapplication-config" content="/icons/ieconfig.xml">
        <link rel="icon" href="/icons/favicon.png">
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">

	    <link rel="stylesheet" href="/static/normalize.css" type="text/css">
		<link href="//fonts.googleapis.com/css?family=Exo:300,400" rel="stylesheet" type="text/css">
	    <link rel="stylesheet" href="/static/main.css" type="text/css">
        <!--[if lt IE 9]><script src="/node_modules/html5shiv/html5shiv.min.js"></script><![endif]-->

        <?php
        function p($x){
			echo '<pre>';
			print_r($x);
			echo '</pre>';
		}
        function d($x){
			echo '<pre>';
			var_dump($x);
			echo '</pre>';
		}
		?>
    </head>
    <body>
	    <div id="map"><div class="la-ball-clip-rotate big"><div></div></div></div>
	    <div id="footer">
		    <p><span class="sound-count">0</span> sounds on this map - zoom in!<br>
		    all recordings by <a href="http://anthonyschwartzman.com" target="_blank">Anthony Schwartzman</a><br>
		    full catalogue on <a href="//soundcloud.com/anthony-schwartzman" target="_blank">SoundCloud</a></p>
	    </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/node_modules/jquery/dist/jquery.min.js"><\/script>')</script>
        <?php 
		spl_autoload_register(function ($class) {
		    include ROOT.'/php/'.$class.'.php';
		});
		$load = new Loader();
        if (!$load->abort) : ?>
        <script src="//maps.googleapis.com/maps/api/js?key=<?=API_KEY_GMAPS?>"></script>
        <script src="//w.soundcloud.com/player/api.js"></script>
        <script src="<?=$load->cache->web?>"></script>
	    <?php endif; ?>
        <script src="/static/main.js"></script>
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','<?=ID_GA?>','auto');ga('send','pageview');
        </script>
    </body>
</html>
