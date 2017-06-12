<?php

// dev-eco.lou-p.fr
// $uri->string = "/"
// $uri->segment = []

// dev-eco.lou-p.fr/home
// $uri->string = "/home"
// $uri->segment = ["home"]

// dev-eco.lou-p.fr/api/v1
// $uri->string = "/api/v1"
// $uri->segment = ["api", "v1"]

$uri = new stdClass();
$uri->string = substr($_SERVER['REQUEST_URI'], 1); // delete first '/'
$uri->segment = explode('/', $uri->string); // build array from URI

switch ($uri->segment[0]) {
	case '':
		// __CONT_/main.php
		$controller = array('folder' => '', 'file' => 'main');
		break;

	case 'mentions-legales':
		// __CONT_/main.php
		$controller = array('folder' => '', 'file' => 'mentions-legales');
		break;

	case 'signalement':
		// __CONT_/main.php
		$controller = array('folder' => '', 'file' => 'signalement');
		break;

	case 'api':
		switch ($uri->segment[1]) {
			case 'v1':
				switch ($uri->segment[2]) {
					case 'get':
					case 'push':
						// __CONT_/api/v1/get.php
						// __CONT_/api/v1/push.php
						$controller = array('folder' => $uri->segment[0].'/'.$uri->segment[1], 'file' => $uri->segment[2]);
						break;

					default:
						header("HTTP/1.0 404 Not Found");
						$controller = array('folder' => '', 'file' => '404');
						break;
				}
				break;

			default:
				header("HTTP/1.0 404 Not Found");
				$controller = array('folder' => '', 'file' => '404');
				break;
		}
		break;

	default:
		header("HTTP/1.0 404 Not Found");
		$controller = array('folder' => '', 'file' => '404');
		break;
}
