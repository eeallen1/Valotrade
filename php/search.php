<?php

	require_once 'connection.php';
	$db = dbConnect();
	if (isset($_GET['search'])) {
		// Create the query
		$data = "%".$_GET['search']."%";
		/*debug_to_console("data: ".$data); */
		$sql = 'SELECT * FROM Listings WHERE TITLE like (:data) OR AUTHOR like (:data) OR CATEGORY like (:data)';
		//debug_to_console("sql: ".$sql); 

		// we have to tell the PDO that we are going to send values to the query
		$stmt = $db->prepare($sql);
		$stmt->bindParam(':data',$data); 
		//debug_to_console("stmt: ".$stmt); 

		// Now we execute the query passing an array toe execute();
		$results = $stmt->execute();
		// Extract the values from $result
		$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$error = $stmt->errorInfo();
		//encode in json to send back to client
		$json = json_encode($rows); 
	
	}


		//return result. Can be empty, but that's handled on client side
		echo $json; 
		
		//destroy database connection
		$db = null; 
	
?>