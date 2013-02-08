<?php

/**
* JSON proxy for localhost development.
* @author Jamie Chung
* @email jfchung@vt.edu
*/

header('Content-type: application/json');
$cached = false;

$contents = json_encode(array());

$url = $_GET['__url'];
if ( $parsed = parse_url($url) )
{
	if ( $parsed['host'] == 'vtrelay.alwaysdata.net' )
	{
		$cached_url = 'cached/'.md5($url);

		if ( file_exists($cached_url) && $cached )
		{
			$contents = file_get_contents($cached_url);
		}
		else
		{
			$contents = file_get_contents($url);

			$fh = fopen($cached_url, 'w+');
			fwrite($fh, $contents);
			fclose($fh);
		}
	}
}

echo $contents;

