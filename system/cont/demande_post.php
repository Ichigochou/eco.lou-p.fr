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
	mobile,
	name,
	first_name,
	description,
	calendrier,
	horaire
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
	'".$_POST['mobile']."',
	'".$_POST['name']."',
	'".$_POST['first_name']."',
	'".$_POST['description']."',
	'".$_POST['calendrier']."',
	'".$_POST['horaire']."'
)";

$BDD->query($awesomeQuery) or die($BDD->error);


header('Location: merci');
