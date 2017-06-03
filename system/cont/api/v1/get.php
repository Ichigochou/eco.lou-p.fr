<?php

function fetch_all($ret) {
	if (is_object($ret) && $ret->num_rows) {
		for ($res = array(); $tmp = $ret->fetch_assoc();) $res[] = $tmp;
	} else {
		return array();
	}
	return ($res);
}

$sql = "";

switch ($uri->segment[3]) {
	case 'nbSignalement':
		$sql = "SELECT COUNT(*) AS nbSignalement FROM signalement";
		break;

	default:
		die("Request not allowed");
		break;
}

$sql = $BDD->query($sql) or die(json_encode(array('error' => 'Erreur de base de données', 'sql' => $BDD->error, 'line' => __LINE__)));
$response = fetch_all($sql);

echo json_encode($response);