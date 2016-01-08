<?php
class Loader
{
	function __construct()
	{
		$this->cache = new Cache();

		if ( file_exists($this->cache->hash_loc) ) :
			$this->cache->init( file_get_contents($this->cache->hash_loc) );
			if (file_exists($this->cache->loc)) { $this->cache->preserve(); }
		endif;

		if ( $this->cache->exists and time() - filemtime($this->cache->loc) < (60*60*24) ) :
			return;
		else :
			try {
				$this->soundcloud = new Soundcloud(USER_ID_SOUNDCLOUD);
			} catch (Exception $e) {
				$this->abort = true;
				return;
			}
			$this->soundcloud->parse();
			$this->cache->init( md5($this->soundcloud->locations) );
			if ($this->cache->exists and $this->cache->hash == $this->cache->old->hash) { return; }

			$this->cache->stash_hash();
			$this->cache->stash_cache($this->soundcloud->locations);
			$this->cache->touch();
			if ( !$this->cache->check() ) { $this->abort = true; }
		endif;
	}
}
?>
