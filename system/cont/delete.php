<?php  
$req = $bdd->prepare('DELETE FROM eco WHERE id =?');
$req->execute(array( $_GET['id_url']));


header('Location: admin');

 ?>