<?php

$time = time();

// on décompose la date
$day = substr($_POST['date2'], 0, 2);
$month = substr($_POST['date2'], 3, 2);
$year = substr($_POST['date2'], 6, 4);

// on créer le timeUnix avec la date anglaise
$calendrier = strtotime($month.'-'.$day.'-'.$year);

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
	'".$calendrier."',
	'".$_POST['horaire']."'
)";

$BDD->query($awesomeQuery) or die($BDD->error);
echo "1";
