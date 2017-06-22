<?php

require_once _VIEW_.'/header.html';
?>
<div class="log">
			
			<!-- condition si on est pas co ça affiche se connecter -->
			<?php 
			if(!isset($_SESSION['id'])){ ?>
			<div class="conect">
	                  <a class="grey-text text-lighten-3" href="login">Se connecter</a>      
	        </div>
	        <?php }  /*si on est co ça affiche se deconnecter*/
	          else{ ?>
	        <div class="disconect">
	                  <a class="grey-text text-lighten-3" href="disconnect_post">Se deconnecter</a>
	                
	        </div>
	        <?php } ?>
			<!-- Fin de la condition -->

        </div>
<?php
require_once _VIEW_.'/'.$controller['folder'].'/'.$controller['file'].'.html';
require_once _VIEW_.'/footer.html';


