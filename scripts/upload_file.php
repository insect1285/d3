<?php
require 'error.php';
//Delete all files older than one day that were previously uploaded
function upload_file($file){
	$files = glob('temp/*'); // get all file names
	foreach($files as $f){ // iterate files
	  if(is_file($f))
	    $date = strtotime((date("F d Y H:i:s")));
	  	$fdate = strtotime(date ("F d Y H:i:s", filemtime($f)));
		$datediff = ($date - $fdate)/(60*60*24);
	  	if($datediff > 1)
	    	unlink($f); // delete files older than 1 day
	}
	//Upload and copy file chosen by user
	$allowedExts = array("csv", "txt"); //file extensions accepted
	$temp = explode(".", $file["file"]["name"]);
	$extension = end($temp);
	$csv_mimetypes = array(
		'text/csv',
		'text/plain',
		'application/csv',
		'text/comma-separated-values',
		'application/excel',
		'application/vnd.ms-excel',
		'application/vnd.msexcel',
		'text/anytext',
		'application/octet-stream',
		'application/txt',
	); // Files mimes allowed

	if ((in_array($_FILES['file']['type'], $csv_mimetypes)) && in_array($extension, $allowedExts))
	  {
	  if ($file["file"]["error"] > 0)
	    {
			error_handler("There was an error with your file.  Please try again later.<br />" . "Error: " . $file["file"]["error"] . "<br>");
	    	//echo "Error: " . $_FILES["file"]["error"] . "<br>";
	    }
	  else
	    {
			if(move_uploaded_file($file['file']['tmp_name'], "temp/" . basename($file["file"]["name"]))) {
				$filepath = "temp/" . $file['file']['name'];
				echo "<script>$(document).ready(function() 
					{
						$('#fUpload').hide();							
						parseCSV('{$filepath}');
					});</script>";	    	
			} else{
		    	error_handler("There was an error uploading the file, please try again!");	
		    	//echo "There was an error uploading the file, please try again!";
			}
	    }
	  }
	else if($file['file']['name'] == null)
	{
		error_handler("Please choose a file!");
	}
	else
	  {
	  	error_handler("This file is not allowed.  Please use only csv files!");	
	  	//echo "Invalid file";
	  }
  }
?>