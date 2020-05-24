<?php

/*
** send a post request
*/

$url = "http://tests.local/tutorials/phpcurl/curlpost.php";

$postdata = array(
    "color" => "red",
    "type" => "car",
    "name" => "BMW"
);

$post = http_build_query($postdata);

$ch = curl_init();

// set curl options

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

curl_exec($ch);

if($e = curl_error($ch)) {
    echo $e;
}

curl_close($ch);