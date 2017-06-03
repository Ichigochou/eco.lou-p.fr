<?php

/***
/***/

// array pré-rempli par /system/define.php
$CONF = array(
	'db_user' => _USER_,
	'db_pass' => _PWD_,
	'db_name' => _DB_,
	'db_host' => _HOST_,
	'db_port' => NULL,
	'db_socket' => NULL
);

// connexion simplifié mysqli
$BDD = new mysqli($CONF['db_host'], $CONF['db_user'], $CONF['db_pass'], $CONF['db_name'], $CONF['db_port'], $CONF['db_socket']);
if ($BDD->connect_errno) {
	echo "Echec lors de la connexion à MySQL : " . $BDD->connect_error;
	die;
}

// suppression de l'array des paramètre pour eviter un affichage involontaire
unset($CONF);

/***/
