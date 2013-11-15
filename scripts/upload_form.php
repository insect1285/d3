<?php
function upload_form(){
	echo '<form action="" method="post" enctype="multipart/form-data">
			<label for="file">Please Choose a CSV File to Use:</label>
			<input type="file" name="file" id="file"><br />	
			<input type="submit" name="submit" value="Submit CSV">		
		</form>';
		
}
?>
