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

$fh = fopen("links.txt", "w");

foreach($links as $link) {
    $link_text = $link->textContent;
    $link_href = $link->getAttribute('href');
    echo $link_text . ' - Link: ' . $link_href;

    fwrite($fh, $link_text . ' - Link: ' . $link_href . "\n");
}

fclose($fh);

