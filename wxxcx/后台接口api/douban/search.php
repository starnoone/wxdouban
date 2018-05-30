<?php
	// 电影搜索api接口
	header("Content-type: text/html; charset=utf-8"); 
	include './fun.php'; 
	
	$q = isset($_GET['q'])?$_GET['q']:'';

	$tag = isset($_GET['tag'])?$_GET['tag']:'';

	

	$url = "http://api.douban.com//v2/movie/search?q=".$q."&tag=".$tag;
	echo httpCurl($url);
?>



