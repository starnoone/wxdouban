<?php
	// 电影详情api接口
	header("Content-type: text/html; charset=utf-8"); 
	include './fun.php'; 
	
	$act = $_GET['act'];

	$id = isset($_GET['id'])?$_GET['id']:0;

	

		$url = "http://api.douban.com/v2/movie/".$act."/".$id;
	echo httpCurl($url);
?>



