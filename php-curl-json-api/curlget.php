<?php

$ch = curl_init();

$url = "https://reqres.in/api/users";

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec($ch);


if($e = curl_error($ch)) {
    echo $e;
}
else {
    $decoded = json_decode($resp);

    print_r($decoded);
}

curl_close($ch);

