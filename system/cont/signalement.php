<?php  
$req = $bdd->prepare("SELECT first_name, name, address, mobile, type, calendrier, horaire FROM loupfrbddteco Where id=?");
$donnees = $req->fetch();

include _VIEW_."/signalement.html";

$_GET['param'] ?>