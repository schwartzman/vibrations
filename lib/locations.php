<?php
$cache = new Cache();

if ( file_exists($cache->hash_loc) ) {
	$cache->init( file_get_contents($cache->hash_loc) );
	if (file_exists($cache->loc)) {
		$cache->preserve();
	}
}

if ( $cache->exists and time() - filemtime($cache->loc) < (60*60*24) ) {
	return;
} else {
	try {
		$soundcloud = new Soundcloud(USER_ID_SOUNDCLOUD);
	} catch (Exception $e) {
		$abort = true;
		return;
	}
	$soundcloud->parse();
	$cache->init( md5($soundcloud->locations) );
	if ($cache->exists and $cache->hash == $cache->old->hash) {
		return;
	}

	$cache->stash_hash();
	$cache->stash_cache($soundcloud->locations);
	$cache->touch();
	if ( !$cache->check() ) {
		$abort = true;
	}
}
?>
