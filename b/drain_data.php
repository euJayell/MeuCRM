<?php
$data = $_GET['d'];

echo file_get_contents('../'.$data);
?>