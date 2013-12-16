<!DOCTYPE HTML>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Site to Make d3 Charts from CSV">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="ROBOTS" content="NOINDEX, NOFOLLOW">
    
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/normalize.css">
	<link rel="stylesheet" type="text/css" href="css/spectrum.css">
	<link rel="author" href="humans.txt">
	<link rel="stylesheet" href="http://yandex.st/highlightjs/7.3/styles/default.min.css">
	
	<script src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="js/site.js"></script>
	<script src="js/spectrum.js"></script>
	<script src="js/jquery.csv-0.71.min.js"></script>
	<script src="js/modernizr-2.6.2.min.js"></script>
	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="js/date.js"></script>	
	
	<title>d3 Charts Creator</title>
</head>
<header>
	<span>Data Driven Documents (d3) Charts Creator</span>
	<br />
	<a class="link home" href="index.php">Home/Reset</a>
	<a class="link help" href="help.html">Directions/Help</a>
</header>
<?php
	require 'scripts/upload_file.php';
	require 'scripts/upload_form.php';
?>
<body>
	<!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->	
    <div id="wrapper">
    	<div id="overlay"> </div>
    	<div id="overlayOptions"> </div>
    	<div id="content">
		    <div id="main">
		    	<div id="dData">
		    		<div id="fUpload">		    			
						<?php echo upload_form(); 
							
						?>
					</div>
					<div id="dataTitle"> </div>
		    	</div>
				<div id="dCustomization">					
					<div id="iChoices" class="choice"> </div> 
				</div>
				<div id="dChart">
					<div id="chart"> </div>
				</div>
				<div id="dCode" style="display: none"> </div>
				
			</div>
			<div class="footer">
				<span style="float:right">Copyright © <?php echo date("Y"); ?> R. Dylan Walker 
				<a href="humans.txt"><img src="http://humanstxt.org/img/oficial-logos/humanstxt-isolated-blank.gif" alt="Humans.txt" width="88" height="31"></a>
				</span>
			</div>
		</div>
	</div>
</body>

<!--CHANGE UA-XXXX to my site ID 
<script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
</script>-->
</html>