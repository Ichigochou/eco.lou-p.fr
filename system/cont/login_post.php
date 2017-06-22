<?php

$pass_hache = sha1($_POST['password']);
$login = $_POST['login'];


$awesomeQuery = "SELECT admin (
	login = :loginREQ,
	password = :passwordREQ
)";
$awesomeQuery-> execute(array(
	'loginREQ' =>$login,
	'passwordREQ' =>$pass_hache
	));
/*$req = $bdd->prepare('SELECT id FROM admin WHERE login = :loginREQ AND password = :passwordREQ');
$req->execute(array(
	'loginREQ'=>$login,
	'passwordREQ'=>$pass_hache
	));

$resultat = $req->fetch();
*/
if (!$awesomeQuery) {
	header('Location: login?msg=erreur');
}else{
	session_start();
	$_SESSION['id'] = $resultat['id'];
	$_SESSION['pseudo'] = $login;
	header('Location: admin');
}