<?php

$time = time();
$awesomeQuery = "INSERT INTO signalement (
	user_id,
	time_creation,
	adresse,
	longitude,
	latitude,
	img_url,
	taille,
	poid,
	nombre,
	description
) VALUES (
	-1,
	".$time.",
	'".$_POST['adresse']."',
	0,
	0,
	'path/to/image',
	'".$_POST['taille']."',
	'".$_POST['poid']."',
	'".$_POST['nombre']."',
	'".$_POST['description']."'
)";

$BDD->query($awesomeQuery) or die($BDD->error);


header('Location: merci');
