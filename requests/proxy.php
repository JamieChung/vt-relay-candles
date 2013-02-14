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
	@$contents = file_get_contents($url);
}

echo $contents;

