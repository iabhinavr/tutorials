<?php

$url = "https://reqres.in/api/users";
$data_array = array(
    'name'  => 'John Doe',
    'job'   => 'Web Developer',
);

$data = http_build_query($data_array);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec($ch);

curl_close($ch);

$decoded = json_decode($resp, true);

foreach($decoded as $key => $val) {
    echo $key . ': ' . $val . '<br>';
}
