<?php

ob_start();

include 'templates/shop.html';

$html = ob_get_clean();

/*
** parse html before outputting or saving
*/

$dom = new DOMDocument();
@ $dom->loadHTML($html, LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED);

// 1. inserting a new element into the document
// eg., find the no. of products and show it at the top

$xpath = new DOMXPath($dom);
$products = $xpath->query("//div[@id='product-list']/div"); //css equivalent to div#product-list > div
$count = $products->length;

// insert the number above the list

$product_list = $dom->getElementById('product-list');

$new_element = $dom->createElement('div', 'No. of products: ' . $count);
$new_element->setAttribute('class', 'alert alert-info');
$product_list->parentNode->insertBefore($new_element, $product_list);

/* alternate method
$new_dom = new DOMDocument();
@ $new_dom->loadHTML('<div class="count">No. of products: '. $count .'</div>', LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED);

$new_node = $new_dom->documentElement;

$imported_node = $dom->importNode($new_node, true);

$product_list->parentNode->insertBefore($imported_node, $product_list);
*/

// 2. delete an element from the document

$title = $xpath->query("//div[@class='container']//div[@class='col-lg-9']//h2"); // returns DOMNodeList
// JS equivalent - document.querySelectorAll('div.container .col-lg-9 h2')
$title_el = $title->item(0); 

$title_el->parentNode->removeChild($title_el);

// finally, save & output the html

$html = @ $dom->saveHTML();
echo $html;