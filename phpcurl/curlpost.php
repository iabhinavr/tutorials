<?php

// only for demonstration, so no validation

if (isset($_POST['color'])) {
    $fh = fopen("post.txt", "w");
    fwrite($fh, $_POST['color']); // do necessary validation in a real application
    fclose($fh);
}
