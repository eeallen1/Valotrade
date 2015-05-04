<?php

require_once 'connection.php';
$db = dbConnect(); 


// Fetching Values From URL
$title = $_POST['title'];
$edition = $_POST['edition'];
$author = $_POST['author'];
$category = $_POST['category'];
$condition = $_POST['condition'];
$contact = $_POST['contact'];
$trade = $_POST['trade'];
$price = $_POST['price'];
$info = $_POST['info'];

$timestamp = $_POST['timestamp'];

$image = 'http://107.170.157.210/PicUploads/'.$timestamp.'img.jpg';//consistent with where cam.js stores image. This one goes into the database for reference

$query = $db->prepare("insert into Listings(title, edition, author, category, cond, contact, trade, price, info, image, timestamp) 
values (:title, :edition, :author, :category, :condition, :contact, :trade, :price, :info, :image, :timestamp)");


$query->bindParam(':title', $title);
$query->bindParam(':edition', $edition);
$query->bindParam(':author', $author);
$query->bindParam(':category', $category);
$query->bindParam(':condition', $condition);
$query->bindParam(':contact', $contact);
$query->bindParam(':trade', $trade);
$query->bindParam(':price', $price);
$query->bindParam(':info', $info);
$query->bindParam(':image', $image);
$query->bindParam(':timestamp', $timestamp);

$query->execute(); 

if(!$query){
	echo "\nPDO::errorInfo():\n";
	print_r($db->errorInfo()); 
}

$db = null; //close connection


?>