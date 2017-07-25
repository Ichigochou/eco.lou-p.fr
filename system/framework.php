<?php
# pour les cookies
session_start();

# Définition variables globales
require_once(dirname(__FILE__).'/define.php');

# Connexion BDD
require_once(_ROOT_.'/bdd.php');

# Controller
require_once(_ROOT_.'/controller.php');

# Nettoyage et compression html
# mettre à 0 pour avoir du "code lisible" dans le navigateur
$sanitize = 0;
require_once(_ROOT_.'/sanitize.php');

# Exécution du Modele
require_once(_CONT_.'/'.$controller['folder'].'/'.$controller['file'].'.php');
