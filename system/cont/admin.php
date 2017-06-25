<?php

if (!isset($_SESSION['pseudo'])){
	header('Location: /login');
}else{
	$awesomeQuery = "SELECT * FROM signalement";

	$signalements=$BDD->query($awesomeQuery) or die($BDD->error);

	require_once _VIEW_.'/header.html';
	require_once _VIEW_.'/'.$controller['folder'].'/'.$controller['file'].'.html';
	require_once _VIEW_.'/footer.html';
}



