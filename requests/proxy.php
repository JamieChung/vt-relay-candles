<?php

$url = $_GET['__url'];

header('Content-type: application/json');

if ( strlen($url) > 0 && $contents = file_get_contents($url) )
{
	echo $contents;
}
else
{
	echo json_encode(array());
}
