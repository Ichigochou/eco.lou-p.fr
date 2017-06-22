<?php

$domaine = $_SERVER['HTTP_HOST'];

if ($domaine == "dev-eco.lou-p.fr") {
	define("_DEV_", true);
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	define("_DOMAIN_", "dev-eco.lou-p.fr");
	define("_HOST_", "localhost");
	define("_USER_", "lou-p");
	define("_PWD_", "1000cetN");
	define ("_DB_", "dev-eco.lou-p.fr");
} else if ($domaine == "eco.lou-p.fr") {
	define("_DEV_", false);
	@ini_set("error_reporting", "-1"); // désactivation des messages d'erreur en prod
	@ini_set("display_errors", "-1"); // désactivation des messages d'erreur en prod
	define("_DOMAIN_", "http://eco.lou-p.fr");
	define("_HOST_", "loupfrbddteco.mysql.db");
	define("_USER_", "loupfrbddteco");
	define("_PWD_", "1000cetN");
	define ("_DB_", "loupfrbddteco");
} else {
	die('Error : unknown domain');
}

define("_ROOT_", dirname(__FILE__));         //system
define("_CONT_", dirname(__FILE__).'/cont'); //system/cont
define("_VIEW_", dirname(__FILE__).'/view'); //system/view
define("_LIB_", dirname(__FILE__).'/lib');   //system/lib


