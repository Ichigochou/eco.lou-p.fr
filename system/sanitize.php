<?php

function sanitize_output($buffer)
{
	$search = array(
		'/\>[^\S ]+/s',         // strip whitespaces after tags, except space
		'/[^\S ]+\</s',         // strip whitespaces before tags, except space
		'/(\s)+/s',             // shorten multiple whitespace sequences
		'/(\t)+/s',             // shorten multiple tab sequences
		'/<!--(.|\s)*?-->/',    // strip HTML comments
		'/\/\*(.|\s)*?\*\//',   // strip JS comments
		'#(?://)?<!\[CDATA\[(.*?)(?://)?\]\]>#s', //leave CDATA alone
	);
	$replace = array(
		'>',
		'<',
		'\\1',
		'',
		'',
		"//<![CDATA[\n".'\1'."\n//]]>",
	);


	$buffer = preg_replace($search, $replace, $buffer);


	return $buffer;

}

if ($sanitize) {
	ob_start("sanitize_output");
}
