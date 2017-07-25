<?php
if (isset($_SESSION['pseudo'])){
	$idSignalement = $_POST['id_signalement'];
	$idSignalement = intval($idSignalement);
	if ($idSignalement <= 0){
		die('Identifiant invalide');
	};
	$QUERY = 'DELETE FROM signalement WHERE id= '.$idSignalement;
	$BDD->query($QUERY) or die($BDD->error);
	die('1');
}

else{
	die('Vous devez etre connecté MERCI');
}