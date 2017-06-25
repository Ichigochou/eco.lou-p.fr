<?php

require_once _VIEW_.'/header.html';
?>
	<div class="log">

		<!-- condition si on est pas co ça affiche se connecter -->
		<?php
		if(!isset($_SESSION['id'])){ ?>
			<div class="conect">
			    <a class="grey-text text-lighten-3" href="login"><i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i></a>
			</div>
		<?php }  /*si on est co ça affiche se deconnecter*/
		else{ ?>
			<div class="disconect">
			    <a class="grey-text text-lighten-3" href="disconnect_post"><i class="fa fa-user-times fa_2x" aria-hidden="true"></i></a>

			</div>
		<?php } ?>
		<!-- Fin de la condition -->

    </div>


<?php
require_once _VIEW_.'/'.$controller['folder'].'/'.$controller['file'].'.html';
require_once _VIEW_.'/footer.html';


