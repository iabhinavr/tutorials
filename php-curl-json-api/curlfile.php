<?php

$ch = curl_init();

$fh = fopen("file.txt", "w");

$url = "https://reqres.in/api/users";
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_FILE, $fh);

curl_exec($ch);

fclose($fh);
curl_close($ch);