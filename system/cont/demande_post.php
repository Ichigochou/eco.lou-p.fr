 <?php


$time = time();
$awesomeQuery = "INSERT INTO signalement (
	user_id,
	time_creation,
	longitude,
	latitude,
	img_url,
	taille,
	poid,
	nombre,
	`desc`,
	enlevement_rdv
) VALUES (
	-1,
	".$time.",
	0,
	0,
	'path/to/image',
	'".$_POST['taille']."',
	'".$_POST['poid']."',
	-1,
	'description vide',
	-1
)";

$BDD->query($awesomeQuery) or die($BDD->error);

echo "1";