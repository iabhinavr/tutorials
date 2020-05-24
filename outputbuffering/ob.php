<?php

ob_start();

include 'filters.php';

include "template.php";

$output = ob_get_clean();

$output = filter_output($output);

echo $output;

