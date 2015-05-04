<?php


print_r($_FILES);

$new_image_name = $_POST['value1'].'img.jpg';
move_uploaded_file($_FILES["file"]["tmp_name"], "../PicUploads/".$new_image_name);

 
?>