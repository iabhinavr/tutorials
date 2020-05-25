<?php

ob_start();

include 'templates/shop.html';

$html = ob_get_clean();

/*
** parse html before outputting or saving
*/

// 1. inserting a new element into the document
// eg., find the no. of products and show it at the top

$dom = new DOMDocument();
@ $dom->loadHTML($html, LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED);

$product_list = $dom->getElementById('product-list');

$xpath = new DOMXPath($dom);
$products = $xpath->query("//div[@id='product-list']/div"); 
//css equivalent to div#product-list > div
$count = $products->length;

$new_element = $dom->createElement('div', 'No. of products: ' . $count);
$product_list->parentNode->insertBefore($new_element, $product_list);

$new_element->setAttribute('class', 'alert alert-info');

// 2. delete an element from the document

$title = $xpath->query("//div[@class='container']//div[@class='col-lg-9']//h2"); 
// returns DOMNodeList
// JS equivalent - document.querySelectorAll('div.container .col-lg-9 h2')
$title_el = $title->item(0); 

$title_el->parentNode->removeChild($title_el);

// save the new html

$html = @ $dom->saveHTML();

// finally, output the html

echo $html;