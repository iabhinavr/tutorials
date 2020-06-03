<?php

$html = '<div>some content</div>';

$dom = new DOMDocument();
@$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
$new_html = @$dom->saveHTML();
?><!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    <?php echo $new_html; ?>
</body>
</html>

