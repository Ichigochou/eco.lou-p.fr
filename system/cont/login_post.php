<?php
$pass_hache = sha1($_POST['password']);
$login = mysqli_real_escape_string ( $BDD , $_POST['login'] );

$awesomeQuery = "SELECT * FROM admin WHERE
	login = \"".$login."\" AND
	password = \"".$pass_hache."\"
";

$response=$BDD->query($awesomeQuery) or die($BDD->error);

if ($response->num_rows !=1 ) {
	header('Location: login?msg=erreur');
}else{
	$_SESSION['pseudo'] = $login;
	header('Location: admin');
}
