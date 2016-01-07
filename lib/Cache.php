<?php
class Cache
{
	function __construct($hash=null){
		$this->hash_loc = ROOT.'/cache/hash';
		$this->exists = false;
		if (isset($hash)) {
			$this->init($hash);
		}
	}
	public function init($hash){
		$this->hash = $hash;
		$this->web = "/cache/locations-$hash.js";
		$this->loc = ROOT.$this->web;
	}
	public function preserve(){
		$this->exists = true;
		$this->old = new Preserve($this);
	}
	public function stash_hash(){
		$res = fopen($this->hash_loc, 'w');
		fwrite($res, $this->hash);
		fclose($res);
	}
	public function stash_cache($content){
		$res = fopen($this->loc, 'w');
		$this->cache_go = ( fwrite($res, $content) ) ? true : false;
		$this->cache_go = ( fclose($res) ) ? true : false;
	}
	public function touch(){
		touch( $this->loc, time() );
	}
	public function check(){
		if ($this->exists) {
			if ($this->cache_go) {
				unlink($this->old->loc);
			} else {
				$this->web = $this->old->web;
			}
		} elseif (!$this->cache_go) {
			return false; 
		}
		return true;
	}
}
?>
