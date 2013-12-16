<?php
function upload_form(){
	$selection = null;
	echo '<form action="" method="post" enctype="multipart/form-data">
			<label for="datsource">Please Choose a Datasource to Use:</label>
		 	 <select name="datasource">
				<option value="CSV">CSV File</option>
				<option value="SQL">SQL Server</option>
		  	</select>
		  	<input type="submit" name="submitDS" value="Submit">		
		</form>';	
	if(isset($_POST['datasource'])){
		$selection = $_REQUEST['datasource'];	
	};	
	if($selection == 'CSV'){
		echo '<form action="" method="post" enctype="multipart/form-data">
			<label for="file">Please Choose a CSV File to Use:</label>
			<input type="file" name="file" id="file"><br />	
			<input type="submit" name="submitCSV" value="Submit CSV">		
		</form>';
	} else if ($selection == 'SQL') {
		echo '<form action="" method="post" enctype="multipart/form-data">
			<label>Please Configure Your Server Options:</label><br/>
			<label class="inline">Server Address:</label><input name="serveradd"></input><br/>
			<label class="inline">User:</label><input name="user"></input><br/>	
			<label class="inline">Password:</label><input name="pw"></input><br/>
			<label class="inline">Database:</label><input name="db"></input><br/>
			<label class="inline">Table/Query:</label><input name="tbl"></input><br/>							
			<input type="submit" name="submitSQL" value="Submit SQL Server Information">		
		</form>';
	}
	if (isset($_POST['submitCSV'])) {
		echo upload_file($_FILES);
	} else if (isset($_POST['submitSQL'])) {
		$ConnInfo = array("Database"=>$_POST['db'],"UID"=>$_POST['user'],"PWD"=>$_POST['pw']);
		$SQLConnection = sqlsrv_connect($_POST['serveradd'], $ConnInfo);		
		if(!$SQLConnection){			
			die('Something went wrong while trying to connect to your SQL Server!');			
			if( ($errors = sqlsrv_errors() ) != null) {
		        foreach( $errors as $error ) {
		            echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
		            echo "code: ".$error[ 'code']."<br />";
		            echo "message: ".$error[ 'message']."<br />";
		        }
			}
		}
		$tbl = $_POST['tbl'];
		$sql = 'SELECT * FROM {$tbl}';
		$stmt = sqlsrv_query($SQLConnection, $sql);
		if(!$stmt){
			die('Something went wrong retrieving data from your table!');
			if( ($errors = sqlsrv_errors() ) != null) {
		        foreach( $errors as $error ) {
		            echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
		            echo "code: ".$error[ 'code']."<br />";
		            echo "message: ".$error[ 'message']."<br />";
		        }
			}
		}
	}		
}
?>
