<?php
class Soundcloud
{
	function __construct($user_id){
		$this->fetch($user_id);
	}
	private function fetch($user_id){
		if ( !$this->json = @file_get_contents('https://api.soundcloud.com/users/'.$user_id.'/tracks?client_id='.API_KEY_SOUNDCLOUD) ) {
			throw new Exception("Soundcloud API call failed", 1);
		}
	}
	public function parse() {
		$obj = json_decode($this->json);
		$this->count = count($obj);
		$result = 'var locations = [';
		$i = 0;
		foreach ($obj as $track) :
			$desc = $track->description;
			preg_match('/(-?\d+\.\d+),\s?(-?\d+\.\d+)/', $desc, $geo);
			preg_match('/(\d{4}-\d{2}-\d{2})/', $desc, $date);
			preg_match('/(\d{2}:\d{2})/', $desc, $time);
			$player = '<iframe width="100%" height="20" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'.$track->id.'&amp;color=ff9900&amp;inverse=false&amp;auto_play=false&amp;show_user=false"></iframe>';
			$content = '<p><span style="font-weight: bold">'.$track->title.'</span><br>'.$date[0].'<br>'.$time[0].'</p>'.$player;
			$result .= "{id:'$track->id',title:'$track->title',slug:'$track->permalink',date:'$date[0]',time:'$time[0]',lat:'$geo[1]',long:'$geo[2]'}";
			$result .= (count($obj) > ++$i) ? ',' : '';
		endforeach;
		$result .= ']';
		$this->locations = $result;
	}
}
?>
