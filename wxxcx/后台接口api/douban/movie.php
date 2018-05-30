<?php
	// 分类查找餐馆
	header("Content-type: text/html; charset=utf-8"); 
	include './fun.php'; 
	
	$act = $_GET['act'];

	$start = isset($_GET['start'])?$_GET['start']:0;
	$count = isset($_GET['count'])?$_GET['count']:21;

	

		$url = "http://api.douban.com/v2/movie/".$act."?start=".$start."&count=".$count;
	
	echo httpCurl($url);
?>



