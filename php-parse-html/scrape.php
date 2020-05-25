<?php

// send a curl get request to get the html input

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://codingreflections.com/wordpress-programming-languages");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$html = curl_exec($ch);

// find all heading (h2) elements on the page

$dom = new DOMDocument();

@ $dom->loadHTML($html);

$h2s = $dom->getElementsByTagName('h2'); // DOMNodeList object

$h2_array = array();

foreach($h2s as $h2) {
    $title_text = $h2->textContent;
    $h2_array[] = $title_text;
    echo $title_text . '<br>';
}

// find all links in the article

echo '<br><br>Links in the article<br><br>';

$articles = $dom->getElementsByTagName('article');

$article = $articles->item(0);

$links = $article->getElementsByTagName('a');

foreach($links as $link) {
    echo $link->textContent . ' - Link: ' . $link->getAttribute('href');
}

if(file_exists('links.txt')) {
    file_put_contents("links.txt", "");
}
$fh = fopen("links.txt", "a");
foreach($links as $link) {
    fwrite($fh, $link->getAttribute('href'). "\n");
}
fclose($fh);

